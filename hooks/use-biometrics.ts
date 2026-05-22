import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import {
  authenticateWithBiometrics,
  isBiometricsAvailable,
  isBiometricsEnabled,
  setBiometricsEnabled,
} from '@/lib/biometrics';

export function useBiometrics() {
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [avail, en] = await Promise.all([
        isBiometricsAvailable(),
        isBiometricsEnabled(),
      ]);
      if (cancelled) return;
      setAvailable(avail);
      setEnabled(en);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Re-read enabled state when the screen regains focus (e.g. after the
  // biometric-setup modal changes the value).
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const en = await isBiometricsEnabled();
        setEnabled(en);
      })();
    }, [])
  );

  const toggle = useCallback(async (value: boolean) => {
    if (value) {
      const success = await authenticateWithBiometrics();
      if (!success) return;
    }
    await setBiometricsEnabled(value);
    setEnabled(value);
  }, []);

  return { available, enabled, loading, toggle };
}
