import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { Payslip } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function usePayslip(): AsyncResource<Payslip> {
  const loader = useCallback(async (signal: AbortSignal) => {
    return apiFetch<Payslip>('/person/payslip', { signal });
  }, []);

  return useAsyncResource(loader);
}
