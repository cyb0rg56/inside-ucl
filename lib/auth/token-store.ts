import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Persisted token bundle. We store everything the app needs to make
 * authenticated requests and silently refresh when the access token is about
 * to expire, without re-prompting the user.
 */
export type StoredAuthSession = {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  /** Unix epoch (ms) at which the access token expires. */
  expiresAt: number;
  scope?: string;
  tokenType?: string;
};

const STORAGE_KEY = 'insideucl.auth.session';

/**
 * SecureStore is unavailable on web. Fall back to in-memory storage there so
 * dev on web doesn't crash; production tokens should never be persisted in
 * `localStorage` (XSS risk).
 */
let memoryFallback: string | null = null;

const isSecureStoreAvailable = Platform.OS === 'ios' || Platform.OS === 'android';

async function setItem(key: string, value: string): Promise<void> {
  if (isSecureStoreAvailable) {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    return;
  }
  memoryFallback = value;
}

async function getItem(key: string): Promise<string | null> {
  if (isSecureStoreAvailable) {
    return SecureStore.getItemAsync(key);
  }
  return memoryFallback;
}

async function deleteItem(key: string): Promise<void> {
  if (isSecureStoreAvailable) {
    await SecureStore.deleteItemAsync(key);
    return;
  }
  memoryFallback = null;
}

export async function saveSession(session: StoredAuthSession): Promise<void> {
  await setItem(STORAGE_KEY, JSON.stringify(session));
}

export async function loadSession(): Promise<StoredAuthSession | null> {
  const raw = await getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuthSession;
  } catch {
    await deleteItem(STORAGE_KEY);
    return null;
  }
}

export async function clearSession(): Promise<void> {
  await deleteItem(STORAGE_KEY);
}
