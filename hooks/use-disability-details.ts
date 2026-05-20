import { useCallback } from 'react';

import { DISABILITY_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { DisabilityDetail, DisabilityDetailsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useDisabilityDetails(): AsyncResource<DisabilityDetail[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<DisabilityDetailsResponse>(
      '/person/disability-details',
      DISABILITY_DETAILS[0],
      { signal },
    );
    return data.disability_details;
  }, []);

  return useAsyncResource(loader);
}
