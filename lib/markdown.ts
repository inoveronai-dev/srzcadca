/** Minimal Markdown → HTML for imported WP content (no extra deps). */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text: string): string {
  let t = text;
  // images ![alt](url)
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, url) => {
    return `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" loading="lazy" />`;
  });
  // links [text](url)
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) => {
    const external = /^https?:\/\//.test(url);
    const rel = external ? ' rel="noopener noreferrer" target="_blank"' : "";
    return `<a href="${escapeHtml(url)}"${rel}>${inlineBasic(label)}</a>`;
  });
  return inlineBasic(t);
}

function inlineBasic(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let inUl = false;
  let inOl = false;
  let para: string[] = [];

  const closeLists = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };
  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    // HTML table / block passthrough
    if (line.trim().startsWith("<table")) {
      flushPara();
      closeLists();
      const chunk: string[] = [line];
      while (i + 1 < lines.length && !chunk.join("\n").includes("</table>")) {
        i += 1;
        chunk.push(lines[i]);
      }
      out.push(chunk.join("\n"));
      i += 1;
      continue;
    }

    if (/^#{1,6}\s+/.test(line)) {
      flushPara();
      closeLists();
      const level = line.match(/^#+/)![0].length;
      const text = line.replace(/^#{1,6}\s+/, "");
      out.push(`<h${level}>${inline(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushPara();
      if (inOl) {
        out.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      if (inUl) {
        out.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        out.push("<ol>");
        inOl = true;
      }
      out.push(`<li>${inline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      flushPara();
      closeLists();
      i += 1;
      continue;
    }

    closeLists();
    para.push(line.trim());
    i += 1;
  }
  flushPara();
  closeLists();
  return out.join("\n");
}
