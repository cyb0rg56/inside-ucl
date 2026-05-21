import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const BIOMETRICS_ENABLED_KEY = 'insideucl.biometrics.enabled';

const isSecureStoreAvailable = Platform.OS === 'ios' || Platform.OS === 'android';

export async function isBiometricsAvailable(): Promise<boolean> {
  if (!isSecureStoreAvailable) return false;
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) return false;
  return LocalAuthentication.isEnrolledAsync();
}

export async function isBiometricsEnabled(): Promise<boolean> {
  if (!isSecureStoreAvailable) return false;
  const value = await SecureStore.getItemAsync(BIOMETRICS_ENABLED_KEY);
  return value === 'true';
}

export async function setBiometricsEnabled(enabled: boolean): Promise<void> {
  if (!isSecureStoreAvailable) return;
  if (enabled) {
    await SecureStore.setItemAsync(BIOMETRICS_ENABLED_KEY, 'true');
  } else {
    await SecureStore.deleteItemAsync(BIOMETRICS_ENABLED_KEY);
  }
}

export async function authenticateWithBiometrics(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to access Inside UCL',
    fallbackLabel: 'Use passcode',
    disableDeviceFallback: false,
  });
  return result.success;
}
