import Exa from 'exa-js';

let exaClient: Exa | null = null;

/** Lazy Exa client so builds succeed when EXA_API_KEY is not set. */
export function getExa(): Exa {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) {
    throw new Error('EXA_API_KEY is not configured');
  }
  if (!exaClient) {
    exaClient = new Exa(apiKey);
  }
  return exaClient;
}
