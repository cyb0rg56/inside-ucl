import { useCallback } from 'react';

import { EDI_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { EdiDetails, EdiDetailsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEdiDetails(): AsyncResource<EdiDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<EdiDetailsResponse>(
      '/person/edi-details',
      EDI_DETAILS[0],
      { signal },
    );
    return data.edi;
  }, []);

  return useAsyncResource(loader);
}
