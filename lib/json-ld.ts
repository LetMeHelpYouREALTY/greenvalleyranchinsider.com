/**
 * Serialize JSON-LD for inline script tags (escape `<` per Next.js / Google guidance).
 */
export function jsonLdStringify(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
