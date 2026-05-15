import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_PORT = 3001;

function resolveApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const debuggerHost =
    Constants.expoConfig?.hostUri ?? (Constants as unknown as { expoGoConfig?: { debuggerHost?: string } }).expoGoConfig?.debuggerHost;
  const host = debuggerHost?.split(':')[0];

  if (host) {
    return `http://${host}:${API_PORT}`;
  }

  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${API_PORT}`;
  }

  return `http://localhost:${API_PORT}`;
}

export const API_BASE_URL = resolveApiBaseUrl();

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Optional access-token resolver wired up by the auth provider at runtime.
 * Kept out of the React tree so plain modules (hooks, side-effects) can call
 * {@link apiFetch} without threading the auth context through every caller.
 */
export type AccessTokenProvider = () => Promise<string | null>;

let accessTokenProvider: AccessTokenProvider | null = null;

export function setAccessTokenProvider(provider: AccessTokenProvider | null): void {
  accessTokenProvider = provider;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const headers = new Headers(init?.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  if (accessTokenProvider) {
    try {
      const token = await accessTokenProvider();
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch {
      // Fall through and let the request go out unauthenticated; the server
      // will respond with 401 which surfaces as an ApiError below.
    }
  }

  let response: Response;
  try {
    response = await fetch(url, { ...init, headers });
  } catch (err) {
    const cause = err instanceof Error ? err.message : 'unknown error';
    throw new ApiError(`Network request failed for ${url} (${cause})`);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed (${response.status}) for ${path}`, response.status);
  }

  return (await response.json()) as T;
}
