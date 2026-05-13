import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { DisabilityDetail, DisabilityDetailsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useDisabilityDetails(): AsyncResource<DisabilityDetail[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<DisabilityDetailsResponse>('/person/disability-details', { signal });
    return data.disability_details;
  }, []);

  return useAsyncResource(loader);
}
