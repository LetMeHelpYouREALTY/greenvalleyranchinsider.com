import Exa from 'exa-js';

let exaClient: Exa | null = null;

/** Lazy Exa client so builds succeed when EXA_API_KEY is not set locally. */
export function getExaClient(): Exa | null {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) return null;
  if (!exaClient) {
    exaClient = new Exa(apiKey);
  }
  return exaClient;
}
