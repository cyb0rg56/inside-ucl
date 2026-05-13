import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { BankDetails } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useBankDetails(): AsyncResource<BankDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    return apiFetch<BankDetails>('/person/bank-details', { signal });
  }, []);

  return useAsyncResource(loader);
}
