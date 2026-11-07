const NBSP = "\u00A0";

/**
 * Slovak typography: no orphaned one-letter prepositions/conjunctions at line ends,
 * and keep numbers with units / date parts together.
 */
export function sk(text: string): string {
  if (!text) return text;
  let out = text;

  // One-letter words a/i/k/o/s/u/v/z (+ capitals) → NBSP after them
  // Lookbehind + lookahead so consecutive orphans (a i o) all get fixed
  out = out.replace(
    /(?<![\p{L}\p{N}])([aikousvzAIKOUSVZ]) (?=[\p{L}\p{N}])/gu,
    `$1${NBSP}`,
  );

  // Numbers with units: 3 ha, 35 €, 15 min
  out = out.replace(
    /(\d+(?:[.,]\d+)?)\s+(€|ha|min|r\.|ks|km|kg|t|m)(?=$|[^\p{L}\p{N}])/giu,
    `$1${NBSP}$2`,
  );

  // Full dates: 2. 11. 2026
  out = out.replace(
    /(\d{1,2})\.\s+(\d{1,2})\.\s+(\d{4})/g,
    `$1.${NBSP}$2.${NBSP}$3`,
  );

  // Partial dates: 14. 10.
  out = out.replace(/(\d{1,2})\.\s+(\d{1,2})\./g, `$1.${NBSP}$2.`);

  return out;
}

/** Apply sk() to plain text nodes inside HTML. */
export function skHtml(html: string): string {
  if (!html) return html;
  return html.replace(/>([^<]+)</g, (_m, text: string) => `>${sk(text)}<`);
}
