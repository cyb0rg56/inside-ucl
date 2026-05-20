import { useCallback } from 'react';

import { PAYSLIP_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { Payslip } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function usePayslip(): AsyncResource<Payslip> {
  const loader = useCallback(async (signal: AbortSignal) => {
    return apiFetchWithFallback<Payslip>('/person/payslip', PAYSLIP_DETAILS[0], { signal });
  }, []);

  return useAsyncResource(loader);
}
