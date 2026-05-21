import { useCallback, useEffect, useState } from 'react';

import {
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

  const toggle = useCallback(async (value: boolean) => {
    await setBiometricsEnabled(value);
    setEnabled(value);
  }, []);

  return { available, enabled, loading, toggle };
}
