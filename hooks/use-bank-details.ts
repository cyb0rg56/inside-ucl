import { useCallback } from 'react';

import { BANK_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { BankDetails } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useBankDetails(): AsyncResource<BankDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    return apiFetchWithFallback<BankDetails>('/person/bank-details', BANK_DETAILS[0], { signal });
  }, []);

  return useAsyncResource(loader);
}
