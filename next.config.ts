import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const projectRoot = path.resolve(__dirname);

function loadRedirects() {
  const file = path.join(projectRoot, "content/redirects.json");
  try {
    const raw = fs.readFileSync(file, "utf8");
    const list = JSON.parse(raw) as Array<{
      source: string;
      destination: string;
      permanent?: boolean;
    }>;
    return list
      .filter((r) => r.source && r.destination)
      .map((r) => ({
        source: r.source.replace(/\/$/, "") || "/",
        destination: r.destination,
        permanent: r.permanent !== false,
      }));
  } catch {
    return [
      {
        source: "/vsetky-novinky",
        destination: "/aktuality",
        permanent: true,
      },
      {
        source: "/predaj-rybarskych-povoleni",
        destination: "/povolenia",
        permanent: true,
      },
      { source: "/kontakty", destination: "/kontakt", permanent: true },
      {
        source: "/miestny-rybarsky-poriadok",
        destination: "/miestny-poriadok",
        permanent: true,
      },
      { source: "/2-dani", destination: "/2-percenta", permanent: true },
      { source: "/liahen-rieka-2", destination: "/liahen", permanent: true },
      { source: "/rybarsky-kruzok", destination: "/kruzok", permanent: true },
    ];
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
