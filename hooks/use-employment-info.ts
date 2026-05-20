import { useCallback } from 'react';

import { CONTRACT_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { EmploymentInfo, EmploymentInfoResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEmploymentInfo(): AsyncResource<EmploymentInfo[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<EmploymentInfoResponse>(
      '/person/employment-info',
      CONTRACT_DETAILS[0],
      { signal },
    );
    return data.employment_info_collection.employment_info;
  }, []);

  return useAsyncResource(loader);
}
