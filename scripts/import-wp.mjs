#!/usr/bin/env node
/**
 * Idempotent WordPress → local Markdown/media import for srzcadca.sk
 * Usage: node scripts/import-wp.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import TurndownService from "turndown";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = "https://www.srzcadca.sk";
const UA = "srz-cadca-import/1.0 (+local rebuild)";

const CATEGORY_MAP = {
  novinky: { key: "novinky", label: "Novinky" },
  "informacie-z-revirov": { key: "reviry", label: "Z revírov" },
  "pre-rybarov": { key: "pre-rybarov", label: "Pre rybárov" },
  "predaj-povoleni": { key: "povolenia", label: "Povolenia" },
  brigady: { key: "brigady", label: "Brigády" },
  preteky: { key: "preteky", label: "Preteky" },
  "rybarsky-kruzok": { key: "kruzok", label: "Krúžok" },
  "zarybnovanie-revirov": { key: "zarybnovanie", label: "Zarybňovanie" },
  "vybor-a-kk": { key: "vybor", label: "Výbor a KK" },
  "vybor-a-kontrolna-komisia": { key: "vybor", label: "Výbor a KK" },
  "clenska-schodza": { key: "schodza", label: "Členská schôdza" },
  "rybarsky-ples": { key: "ples", label: "Ples" },
  "straty-a-nalezy": { key: "straty", label: "Straty a nálezy" },
  "rybarske-spravy": { key: "spravy", label: "Rybárske správy" },
  nezaradene: { key: "novinky", label: "Novinky" },
};

const summary = {
  posts: 0,
  pages: 0,
  portfolio: 0,
  filesDownloaded: 0,
  filesSkipped: 0,
  failures: [],
  redirects: [],
};

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`${res.status} ${url}`);
  }
  const total = Number(res.headers.get("X-WP-Total") || 0);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") || 1);
  const data = await res.json();
  return { data, total, totalPages, headers: res.headers };
}

async function fetchAll(endpoint, perPage = 50, withEmbed = true) {
  const embed = withEmbed ? "&_embed=1" : "";
  const firstUrl = `${BASE}/wp-json/wp/v2/${endpoint}?per_page=${perPage}&page=1${embed}`;
  console.log(`  GET ${endpoint} page 1…`);
  const first = await fetchJson(firstUrl);
  const items = [...first.data];
  for (let page = 2; page <= first.totalPages; page++) {
    const url = `${BASE}/wp-json/wp/v2/${endpoint}?per_page=${perPage}&page=${page}${embed}`;
    console.log(`  GET ${endpoint} page ${page}/${first.totalPages}…`);
    const next = await fetchJson(url);
    items.push(...next.data);
  }
  return items;
}

function decodeHtml(text = "") {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—");
}

function stripEnfold(html = "") {
  return html
    .replace(/\[[\/]?av_[^\]]*\]/gi, "")
    .replace(/\[\/?av_[^\]]*\]/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\sstyle='[^']*'/gi, "")
    .replace(/class="[^"]*"/gi, "")
    .replace(/class='[^']*'/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<div[^>]*>\s*Zdieľať[\s\S]*?<\/div>/gi, "")
    .replace(/Naposledy pridané[\s\S]*?(?=<h[1-6]|$)/gi, "")
    .replace(/<p>\s*(&nbsp;|\s)*<\/p>/gi, "")
    .replace(/\n{3,}/g, "\n\n");
}

function createTurndown() {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  td.addRule("keepTables", {
    filter: ["table"],
    replacement(_content, node) {
      return `\n\n${node.outerHTML}\n\n`;
    },
  });
  return td;
}

function yamlEscape(value) {
  if (value == null) return '""';
  const s = String(value);
  if (/[:#\[\]{},&*?|>!%@`'"]|\n/.test(s) || s !== s.trim()) {
    return JSON.stringify(s);
  }
  return s;
}

function toFrontmatter(obj) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else if (typeof value[0] === "object") {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`  - label: ${yamlEscape(item.label)}`);
          lines.push(`    url: ${yamlEscape(item.url)}`);
          if (item.type) lines.push(`    type: ${yamlEscape(item.type)}`);
        }
      } else {
        lines.push(`${key}:`);
        for (const item of value) lines.push(`  - ${yamlEscape(item)}`);
      }
    } else if (typeof value === "boolean" || typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${yamlEscape(value)}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

function collectUploadUrls(html = "") {
  const urls = new Set();
  const re =
    /https?:\/\/(?:www\.)?srzcadca\.sk\/wp-content\/uploads\/[^\s"'<>)]+/gi;
  let m;
  while ((m = re.exec(html))) {
    let url = m[0].replace(/[.,;:!?)]+$/, "");
    // Prefer originals over sized variants when collecting; keep as-is for rewrite
    urls.add(url);
  }
  return [...urls];
}

function localUploadPath(remoteUrl) {
  const u = new URL(remoteUrl);
  // /wp-content/uploads/YYYY/MM/file.ext → public/uploads/YYYY/MM/file.ext
  const parts = u.pathname.split("/");
  const idx = parts.indexOf("uploads");
  if (idx === -1) return null;
  const rel = parts.slice(idx).join("/"); // uploads/YYYY/MM/file
  return {
    relFs: path.join("public", rel),
    publicPath: `/${rel}`,
  };
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function downloadFile(remoteUrl) {
  if (process.env.SKIP_MEDIA === "1") {
    return localUploadPath(remoteUrl)?.publicPath || null;
  }
  const mapped = localUploadPath(remoteUrl);
  if (!mapped) return null;
  const abs = path.join(ROOT, mapped.relFs);
  try {
    await fs.access(abs);
    summary.filesSkipped += 1;
    return mapped.publicPath;
  } catch {
    // need download
  }
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(remoteUrl, {
      headers: { "User-Agent": UA },
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      summary.failures.push(`download ${res.status} ${remoteUrl}`);
      return null;
    }
    await ensureDir(abs);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(abs, buf);
    summary.filesDownloaded += 1;

    const ext = path.extname(abs).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      try {
        const { stdout } = await execFileAsync("sips", ["-g", "pixelWidth", abs]);
        const w = Number((stdout.match(/pixelWidth:\s*(\d+)/) || [])[1] || 0);
        if (w > 2000) {
          await execFileAsync("sips", ["--resampleWidth", "2000", abs]);
        }
      } catch (e) {
        summary.failures.push(`resize ${abs}: ${e.message}`);
      }
    }
    return mapped.publicPath;
  } catch (e) {
    summary.failures.push(`download ${remoteUrl}: ${e.message}`);
    return null;
  }
}

function rewriteUploads(markdown, urlMap) {
  let out = markdown;
  // Longer URLs first to avoid partial replacements
  const entries = [...urlMap.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [remote, local] of entries) {
    out = out.split(remote).join(local);
  }
  return out;
}

function mapCategories(wpCategories, idToSlug) {
  const keys = new Set();
  for (const id of wpCategories || []) {
    const slug = idToSlug.get(id);
    const mapped = CATEGORY_MAP[slug];
    if (mapped) keys.add(mapped.key);
  }
  if (keys.size === 0) keys.add("novinky");
  return [...keys];
}

function featuredFromEmbed(item) {
  const media = item?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return { image: null, imageAlt: null, sourceUrl: null };
  const sourceUrl =
    media.source_url ||
    media.media_details?.sizes?.full?.source_url ||
    null;
  return {
    image: null,
    imageAlt: decodeHtml(media.alt_text || item.title?.rendered || ""),
    sourceUrl,
  };
}

function extractAttachments(html, urlMap) {
  const attachments = [];
  const re =
    /<a[^>]+href="(https?:\/\/(?:www\.)?srzcadca\.sk\/wp-content\/uploads\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const remote = m[1];
    const label = decodeHtml(m[2].replace(/<[^>]+>/g, "")).trim() || path.basename(remote);
    const local = urlMap.get(remote) || localUploadPath(remote)?.publicPath;
    if (!local) continue;
    const ext = path.extname(local).replace(".", "").toUpperCase();
    attachments.push({ label, url: local, type: ext || "FILE" });
  }
  // unique by url
  const seen = new Set();
  return attachments.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}

async function processHtmlToMarkdown(html) {
  const cleaned = stripEnfold(html || "");
  const urls = collectUploadUrls(cleaned);
  const urlMap = new Map();
  for (const url of urls) {
    const local = await downloadFile(url);
    // Prefer local path; if download failed, keep original remote URL
    urlMap.set(url, local || url);
  }
  const td = createTurndown();
  let md = td.turndown(cleaned);
  md = rewriteUploads(md, urlMap);
  md = md.replace(/\n{3,}/g, "\n\n").trim() + "\n";
  const attachments = extractAttachments(cleaned, urlMap).map((a) => ({
    ...a,
    url: urlMap.get(
      [...urlMap.keys()].find((k) => urlMap.get(k) === a.url) || a.url,
    ) || a.url,
  }));
  return { md, urlMap, attachments };
}

async function writeMarkdown(dir, slug, frontmatter, body) {
  const outDir = path.join(ROOT, dir);
  await fs.mkdir(outDir, { recursive: true });
  const file = path.join(outDir, `${slug}.md`);
  await fs.writeFile(file, toFrontmatter(frontmatter) + body, "utf8");
}

async function importPostsFromList(idToSlug, posts) {
  summary.posts = posts.length;
  console.log(`Processing ${posts.length} posts…`);
  let i = 0;
  for (const post of posts) {
    i += 1;
    try {
      const outFile = path.join(ROOT, "content/aktuality", `${post.slug}.md`);
      try {
        await fs.access(outFile);
        // Still ensure redirects exist for existing files
        summary.redirects.push({
          source: `/${post.slug}`,
          destination: `/aktuality/${post.slug}`,
          permanent: true,
        });
        summary.redirects.push({
          source: `/${post.slug}/`,
          destination: `/aktuality/${post.slug}`,
          permanent: true,
        });
        if (i % 25 === 0) console.log(`  skip existing ${i}/${posts.length}`);
        continue;
      } catch {
        // create
      }
      const title = decodeHtml(post.title?.rendered || "");
      const { md, urlMap, attachments } = await processHtmlToMarkdown(
        post.content?.rendered || "",
      );
      const featured = featuredFromEmbed(post);
      let image = null;
      if (featured.sourceUrl) {
        image = await downloadFile(featured.sourceUrl);
        if (image) urlMap.set(featured.sourceUrl, image);
      }
      const categories = mapCategories(post.categories, idToSlug);
      await writeMarkdown(
        "content/aktuality",
        post.slug,
        {
          title,
          date: post.date,
          modified: post.modified,
          slug: post.slug,
          categories,
          image: image || "",
          imageAlt: featured.imageAlt || title,
          attachments,
          wpId: post.id,
        },
        md,
      );
      summary.redirects.push({
        source: `/${post.slug}`,
        destination: `/aktuality/${post.slug}`,
        permanent: true,
      });
      summary.redirects.push({
        source: `/${post.slug}/`,
        destination: `/aktuality/${post.slug}`,
        permanent: true,
      });
      if (i % 10 === 0 || i === posts.length) {
        console.log(`  post ${i}/${posts.length}: ${post.slug}`);
      }
    } catch (e) {
      summary.failures.push(`post ${post.slug}: ${e.message}`);
      console.error(`  FAIL post ${post.slug}:`, e.message);
    }
  }
}

async function importPosts(idToSlug) {
  const posts = await fetchAll("posts", 50, true);
  await importPostsFromList(idToSlug, posts);
}

async function importPagesFromList(pages) {
  // de-dupe by slug (API returned duplicate rybarske-spravy)
  const bySlug = new Map();
  for (const page of pages) bySlug.set(page.slug, page);
  summary.pages = bySlug.size;
  for (const page of bySlug.values()) {
    try {
      const title = decodeHtml(page.title?.rendered || "");
      const { md, attachments } = await processHtmlToMarkdown(
        page.content?.rendered || "",
      );
      const featured = featuredFromEmbed(page);
      let image = null;
      if (featured.sourceUrl) image = await downloadFile(featured.sourceUrl);
      await writeMarkdown(
        "content/stranky",
        page.slug,
        {
          title,
          date: page.date,
          modified: page.modified,
          slug: page.slug,
          image: image || "",
          imageAlt: featured.imageAlt || title,
          attachments,
          wpId: page.id,
        },
        md,
      );
    } catch (e) {
      summary.failures.push(`page ${page.slug}: ${e.message}`);
    }
  }
}

async function importPages() {
  const pages = await fetchAll("pages", 100, true);
  await importPagesFromList(pages);
}

async function importPortfolioFromList(items) {
  summary.portfolio = items.length;
  for (const item of items) {
    try {
      const title = decodeHtml(item.title?.rendered || "");
      const { md, attachments } = await processHtmlToMarkdown(
        item.content?.rendered || "",
      );
      const featured = featuredFromEmbed(item);
      let image = null;
      if (featured.sourceUrl) image = await downloadFile(featured.sourceUrl);
      await writeMarkdown(
        "content/reviry",
        item.slug,
        {
          title,
          date: item.date,
          modified: item.modified,
          slug: item.slug,
          image: image || "",
          imageAlt: featured.imageAlt || title,
          attachments,
          wpId: item.id,
          type: "portfolio",
        },
        md,
      );
      const enc = encodeURI(`položka portfólia/${item.slug}`);
      summary.redirects.push({
        source: `/položka portfólia/${item.slug}`,
        destination: `/reviry/${item.slug}`,
        permanent: true,
      });
      summary.redirects.push({
        source: `/polo%C5%BEka%20portf%C3%B3lia/${item.slug}`,
        destination: `/reviry/${item.slug}`,
        permanent: true,
      });
      summary.redirects.push({
        source: `/polo%C5%BEka%20portf%C3%B3lia/${item.slug}/`,
        destination: `/reviry/${item.slug}`,
        permanent: true,
      });
    } catch (e) {
      summary.failures.push(`portfolio ${item.slug}: ${e.message}`);
    }
  }
}

async function importPortfolio() {
  try {
    const items = await fetchAll("portfolio", 100, true);
    await importPortfolioFromList(items);
  } catch (e) {
    summary.failures.push(`portfolio API: ${e.message}`);
  }
}

async function loadCache(name) {
  const p = path.join(ROOT, "content/.wp-cache", name);
  try {
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function main() {
  console.log("Loading categories…");
  let cats = await loadCache("categories.json");
  if (!cats) {
    console.log("Fetching categories…");
    cats = await fetchAll("categories", 50, false);
  }
  const idToSlug = new Map(cats.map((c) => [c.id, c.slug]));

  console.log("Importing posts…");
  const cachedPosts = await loadCache("posts-all.json");
  if (cachedPosts?.length) {
    await importPostsFromList(idToSlug, cachedPosts);
  } else {
    await importPosts(idToSlug);
  }
  console.log("Importing pages…");
  const cachedPages = await loadCache("pages.json");
  if (cachedPages?.length) {
    await importPagesFromList(cachedPages);
  } else {
    await importPages();
  }
  console.log("Importing portfolio…");
  const cachedPortfolio = await loadCache("portfolio.json");
  if (cachedPortfolio?.length) {
    await importPortfolioFromList(cachedPortfolio);
  } else {
    await importPortfolio();
  }

  // Static route redirects
  const staticRedirects = [
    { source: "/vsetky-novinky", destination: "/aktuality", permanent: true },
    { source: "/vsetky-novinky/", destination: "/aktuality", permanent: true },
    {
      source: "/predaj-rybarskych-povoleni",
      destination: "/povolenia",
      permanent: true,
    },
    {
      source: "/predaj-rybarskych-povoleni/",
      destination: "/povolenia",
      permanent: true,
    },
    { source: "/kontakty", destination: "/kontakt", permanent: true },
    { source: "/kontakty/", destination: "/kontakt", permanent: true },
    {
      source: "/miestny-rybarsky-poriadok",
      destination: "/miestny-poriadok",
      permanent: true,
    },
    {
      source: "/miestny-rybarsky-poriadok/",
      destination: "/miestny-poriadok",
      permanent: true,
    },
    { source: "/2-dani", destination: "/2-percenta", permanent: true },
    { source: "/2-dani/", destination: "/2-percenta", permanent: true },
    { source: "/liahen-rieka-2", destination: "/liahen", permanent: true },
    { source: "/liahen-rieka-2/", destination: "/liahen", permanent: true },
    { source: "/rybarsky-kruzok", destination: "/kruzok", permanent: true },
    { source: "/rybarsky-kruzok/", destination: "/kruzok", permanent: true },
    {
      source: "/informacie-z-revirov",
      destination: "/aktuality?kategoria=reviry",
      permanent: true,
    },
    {
      source: "/informacie-z-revirov/",
      destination: "/aktuality?kategoria=reviry",
      permanent: true,
    },
    {
      source: "/zarybnovanie-revirov",
      destination: "/zarybnovanie",
      permanent: true,
    },
    {
      source: "/zarybnovanie-revirov/",
      destination: "/zarybnovanie",
      permanent: true,
    },
    { source: "/category/novinky", destination: "/aktuality", permanent: true },
    {
      source: "/category/novinky/",
      destination: "/aktuality",
      permanent: true,
    },
    {
      source: "/category/brigady",
      destination: "/brigady",
      permanent: true,
    },
    {
      source: "/category/brigady/",
      destination: "/brigady",
      permanent: true,
    },
    {
      source: "/category/preteky",
      destination: "/preteky",
      permanent: true,
    },
    {
      source: "/category/preteky/",
      destination: "/preteky",
      permanent: true,
    },
    {
      source: "/category/pre-rybarov",
      destination: "/aktuality?kategoria=pre-rybarov",
      permanent: true,
    },
    {
      source: "/category/informacie-z-revirov",
      destination: "/aktuality?kategoria=reviry",
      permanent: true,
    },
    {
      source: "/category/rybarsky-kruzok",
      destination: "/kruzok",
      permanent: true,
    },
    {
      source: "/category/clenska-schodza",
      destination: "/clenska-schodza",
      permanent: true,
    },
    {
      source: "/category/vybor-a-kontrolna-komisia",
      destination: "/vybor",
      permanent: true,
    },
    {
      source: "/category/vybor-a-kk",
      destination: "/vybor",
      permanent: true,
    },
    {
      source: "/category/rybarsky-ples",
      destination: "/ples",
      permanent: true,
    },
    {
      source: "/category/straty-a-nalezy",
      destination: "/straty-a-nalezy",
      permanent: true,
    },
    {
      source: "/category/zarybnovanie-revirov",
      destination: "/zarybnovanie",
      permanent: true,
    },
  ];
  summary.redirects.push(...staticRedirects);

  await fs.mkdir(path.join(ROOT, "content"), { recursive: true });
  await fs.writeFile(
    path.join(ROOT, "content/import-summary.json"),
    JSON.stringify(summary, null, 2),
  );
  await fs.writeFile(
    path.join(ROOT, "content/redirects.json"),
    JSON.stringify(summary.redirects, null, 2),
  );

  console.log("\n=== IMPORT SUMMARY ===");
  console.log(`Posts: ${summary.posts}`);
  console.log(`Pages: ${summary.pages}`);
  console.log(`Portfolio: ${summary.portfolio}`);
  console.log(`Files downloaded: ${summary.filesDownloaded}`);
  console.log(`Files skipped (existing): ${summary.filesSkipped}`);
  console.log(`Redirects: ${summary.redirects.length}`);
  console.log(`Failures: ${summary.failures.length}`);
  if (summary.failures.length) {
    console.log(summary.failures.slice(0, 40).join("\n"));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
