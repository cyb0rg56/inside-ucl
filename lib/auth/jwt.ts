/**
 * Lightweight ID-token claims decoder. We do NOT verify the signature here:
 * the token comes from Microsoft over HTTPS via the OAuth code flow, and any
 * authoritative validation must happen on the backend.
 */

export type EntraIdTokenClaims = {
  sub?: string;
  oid?: string;
  tid?: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
} & Record<string, unknown>;

const BASE64_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * Pure-JS base64 decoder used as a fallback when `globalThis.atob` is missing.
 * Hermes and modern React Native ship `atob`, so this is rarely exercised.
 */
function base64DecodeFallback(input: string): string {
  let output = '';
  let buffer = 0;
  let bits = 0;
  for (const ch of input) {
    if (ch === '=') break;
    const value = BASE64_ALPHABET.indexOf(ch);
    if (value < 0) continue;
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }
  return output;
}

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const padding = padded.length % 4;
  const normalized = padding ? padded + '='.repeat(4 - padding) : padded;

  if (typeof globalThis.atob === 'function') {
    return globalThis.atob(normalized);
  }
  return base64DecodeFallback(normalized);
}

export function decodeIdToken(idToken: string): EntraIdTokenClaims | null {
  try {
    const parts = idToken.split('.');
    if (parts.length < 2) {
      return null;
    }
    const payload = base64UrlDecode(parts[1]);
    // Re-decode through URI escaping to handle UTF-8 characters in claims.
    const json = decodeURIComponent(
      Array.from(payload)
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json) as EntraIdTokenClaims;
  } catch {
    return null;
  }
}
