import { useCallback, useEffect, useRef, useState } from 'react';

export type AsyncResource<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  reload: () => Promise<void>;
};

export function useAsyncResource<T>(loader: (signal: AbortSignal) => Promise<T>): AsyncResource<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);

  const reload = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const result = await loader(controller.signal);
      if (controller.signal.aborted) return;
      setData(result);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [loader]);

  useEffect(() => {
    void reload();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [reload]);

  return { data, error, isLoading, reload };
}
