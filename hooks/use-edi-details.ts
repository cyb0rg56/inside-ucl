import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { EdiDetails, EdiDetailsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEdiDetails(): AsyncResource<EdiDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<EdiDetailsResponse>('/person/edi-details', { signal });
    return data.edi;
  }, []);

  return useAsyncResource(loader);
}
