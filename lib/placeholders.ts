/** When true, UI hides any text/row that still contains `[doplniť`. Default off for review. */
export function hidePlaceholders(): boolean {
  return process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS === "true";
}

export function isPlaceholderText(text: string | undefined | null): boolean {
  if (!text) return false;
  return text.includes("[doplniť");
}

/** Returns null when the text should be hidden under the launch flag. */
export function visibleText(text: string): string | null {
  if (hidePlaceholders() && isPlaceholderText(text)) return null;
  return text;
}
