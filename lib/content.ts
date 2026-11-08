import fs from "node:fs";
import path from "node:path";
import { markdownToHtml } from "./markdown";
import { skHtml } from "./sk";

export type Attachment = { label: string; url: string; type?: string };

export type Article = {
  title: string;
  date: string;
  modified?: string;
  slug: string;
  categories: string[];
  image?: string;
  imageAlt?: string;
  /** When true, image is a real photo safe to crop in cards. Posters stay false. */
  heroImage?: boolean;
  attachments: Attachment[];
  body: string;
  html: string;
  excerpt?: string;
};

export type StaticPage = {
  title: string;
  date?: string;
  slug: string;
  image?: string;
  imageAlt?: string;
  attachments: Attachment[];
  body: string;
  html: string;
};

const ROOT = process.cwd();

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\n/, "");
  const data: Record<string, unknown> = {};
  const lines = fm.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) {
      i += 1;
      continue;
    }
    const key = m[1];
    const val = m[2];
    if (val === "[]") {
      data[key] = [];
      i += 1;
      continue;
    }
    if (val === "") {
      // nested list
      const items: unknown[] = [];
      i += 1;
      while (i < lines.length && /^\s+- /.test(lines[i])) {
        const itemLine = lines[i].replace(/^\s+- /, "");
        if (itemLine.includes(":")) {
          const obj: Record<string, string> = {};
          const first = itemLine.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
          if (first) obj[first[1]] = unquote(first[2]);
          i += 1;
          while (i < lines.length && /^\s{4}[A-Za-z0-9_]+:/.test(lines[i])) {
            const nest = lines[i].trim().match(/^([A-Za-z0-9_]+):\s*(.*)$/);
            if (nest) obj[nest[1]] = unquote(nest[2]);
            i += 1;
          }
          items.push(obj);
        } else {
          items.push(unquote(itemLine));
          i += 1;
        }
      }
      data[key] = items;
      continue;
    }
    data[key] = unquote(val);
    i += 1;
  }
  return { data, body };
}

function unquote(v: string): string {
  const t = v.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    try {
      return JSON.parse(t.startsWith("'") ? `"${t.slice(1, -1)}"` : t);
    } catch {
      return t.slice(1, -1);
    }
  }
  if (t === "true") return true as unknown as string;
  if (t === "false") return false as unknown as string;
  return t;
}

function readMdDir(dir: string): { slug: string; raw: string }[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      raw: fs.readFileSync(path.join(abs, f), "utf8"),
    }));
}

export const CATEGORY_LABELS: Record<string, string> = {
  novinky: "Novinky",
  reviry: "Z revírov",
  "pre-rybarov": "Pre rybárov",
  povolenia: "Povolenia",
  brigady: "Brigády",
  preteky: "Preteky",
  kruzok: "Krúžok",
  zarybnovanie: "Zarybňovanie",
  vybor: "Výbor a KK",
  schodza: "Členská schôdza",
  ples: "Ples",
  straty: "Straty a nálezy",
  spravy: "Rybárske správy",
  zakaz: "Zákaz lovu",
};

export function chipForArticle(article: Pick<Article, "title" | "categories">): {
  key: string;
  label: string;
} {
  if (article.title.trim().toLowerCase().startsWith("zákaz lovu")) {
    return { key: "zakaz", label: "Zákaz lovu" };
  }
  const key = article.categories[0] || "novinky";
  return { key, label: CATEGORY_LABELS[key] || key };
}

export function formatSkDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

function toArticle(slug: string, raw: string): Article {
  const { data, body } = parseFrontmatter(raw);
  const categories = (data.categories as string[]) || [];
  return {
    title: String(data.title || slug),
    date: String(data.date || ""),
    modified: data.modified ? String(data.modified) : undefined,
    slug: String(data.slug || slug),
    categories,
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    heroImage: data.heroImage === true || data.heroImage === "true",
    attachments: (data.attachments as Attachment[]) || [],
    body,
    html: skHtml(markdownToHtml(body)),
  };
}

export function getAllArticles(): Article[] {
  return readMdDir("content/aktuality")
    .map(({ slug, raw }) => toArticle(slug, raw))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | null {
  const file = path.join(ROOT, "content/aktuality", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return toArticle(slug, fs.readFileSync(file, "utf8"));
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.categories.includes(category));
}

export function getPage(slug: string): StaticPage | null {
  const file = path.join(ROOT, "content/stranky", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  return {
    title: String(data.title || slug),
    date: data.date ? String(data.date) : undefined,
    slug: String(data.slug || slug),
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    attachments: (data.attachments as Attachment[]) || [],
    body,
    html: skHtml(markdownToHtml(body)),
  };
}

export function getPortfolio(slug: string): StaticPage | null {
  const file = path.join(ROOT, "content/reviry", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  return {
    title: String(data.title || slug),
    date: data.date ? String(data.date) : undefined,
    slug: String(data.slug || slug),
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    attachments: (data.attachments as Attachment[]) || [],
    body,
    html: skHtml(markdownToHtml(body)),
  };
}

export function getNeighbors(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    next: all[idx - 1] || null, // newer
    prev: all[idx + 1] || null, // older
  };
}
