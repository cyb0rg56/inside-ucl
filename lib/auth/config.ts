import { makeRedirectUri } from 'expo-auth-session';

/**
 * Microsoft Entra ID (Azure AD) OAuth 2.0 / OIDC configuration.
 *
 * Set these in a `.env` file at the project root (Expo automatically picks
 * up env vars prefixed with `EXPO_PUBLIC_`):
 *
 *   EXPO_PUBLIC_ENTRA_TENANT_ID=<your-tenant-id-or-"common"|"organizations">
 *   EXPO_PUBLIC_ENTRA_CLIENT_ID=<your-application-(client)-id>
 *
 * App registration checklist (Azure portal → Entra ID → App registrations):
 *   1. Create a "Mobile and desktop applications" platform.
 *   2. Add the redirect URI logged on first launch (e.g. `insideucl://auth`).
 *   3. Enable "Allow public client flows" under Authentication.
 *   4. Under API permissions, grant delegated `User.Read` (Microsoft Graph).
 */

const TENANT_ID = process.env.EXPO_PUBLIC_ENTRA_TENANT_ID ?? 'common';
const CLIENT_ID = process.env.EXPO_PUBLIC_ENTRA_CLIENT_ID ?? '';

export const ENTRA_TENANT_ID = TENANT_ID;
export const ENTRA_CLIENT_ID = CLIENT_ID;

export const ENTRA_ISSUER = `https://login.microsoftonline.com/${TENANT_ID}/v2.0`;

export const ENTRA_DISCOVERY = {
  authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
  endSessionEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout`,
} as const;

/**
 * Default OIDC scopes plus Microsoft Graph `User.Read` so we can fetch the
 * signed-in user's profile. `offline_access` is required to receive a refresh
 * token from the v2.0 endpoint.
 */
export const ENTRA_SCOPES = [
  'openid',
  'profile',
  'email',
  'offline_access',
  'User.Read',
];

/**
 * Redirect URI used by the auth flow. Must be registered in the Entra ID app
 * registration under "Mobile and desktop applications".
 *
 * In Expo Go this resolves to an https proxy URL; in standalone/dev builds it
 * resolves to `insideucl://auth` (the app's custom scheme + path).
 */
export const ENTRA_REDIRECT_URI = makeRedirectUri({
  scheme: 'insideucl',
  path: 'auth/callback',
});

export function assertEntraConfigured(): void {
  if (!ENTRA_CLIENT_ID) {
    throw new Error(
      'Entra ID is not configured. Set EXPO_PUBLIC_ENTRA_CLIENT_ID (and optionally EXPO_PUBLIC_ENTRA_TENANT_ID) in your .env file.'
    );
  }
}
