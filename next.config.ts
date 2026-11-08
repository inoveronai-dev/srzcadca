import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const projectRoot = path.resolve(__dirname);

/** Manual overrides that must win over imported WP post redirects. */
const PRIORITY_REDIRECTS = [
  {
    source: "/predaj-rybarskych-povoleni",
    destination: "/povolenia",
    permanent: true,
  },
  {
    source: "/vsetky-novinky",
    destination: "/aktuality",
    permanent: true,
  },
  {
    source: "/kontakty",
    destination: "/kontakt",
    permanent: true,
  },
  {
    source: "/miestny-rybarsky-poriadok",
    destination: "/miestny-poriadok",
    permanent: true,
  },
  {
    source: "/2-dani",
    destination: "/2-percenta",
    permanent: true,
  },
  {
    source: "/liahen-rieka-2",
    destination: "/liahen",
    permanent: true,
  },
  {
    source: "/rybarsky-kruzok",
    destination: "/kruzok",
    permanent: true,
  },
] as const;

function normalizeSource(source: string): string {
  return source.replace(/\/$/, "") || "/";
}

function loadRedirects() {
  const prioritySources = new Set(
    PRIORITY_REDIRECTS.map((r) => normalizeSource(r.source)),
  );
  const priority = PRIORITY_REDIRECTS.map((r) => ({
    source: normalizeSource(r.source),
    destination: r.destination,
    permanent: true as const,
  }));

  const file = path.join(projectRoot, "content/redirects.json");
  try {
    const raw = fs.readFileSync(file, "utf8");
    const list = JSON.parse(raw) as Array<{
      source: string;
      destination: string;
      permanent?: boolean;
    }>;
    const rest = list
      .filter((r) => r.source && r.destination)
      .map((r) => ({
        source: normalizeSource(r.source),
        destination: r.destination,
        permanent: r.permanent !== false,
      }))
      .filter((r) => !prioritySources.has(r.source));

    // Priority first so /predaj-rybarskych-povoleni → /povolenia wins
    return [...priority, ...rest];
  } catch {
    return priority;
  }
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return loadRedirects();
  },
};

export default nextConfig;
