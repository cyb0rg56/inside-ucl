import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { EmploymentInfo, EmploymentInfoResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEmploymentInfo(): AsyncResource<EmploymentInfo[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<EmploymentInfoResponse>('/person/employment-info', { signal });
    return data.employment_info_collection.employment_info;
  }, []);

  return useAsyncResource(loader);
}
