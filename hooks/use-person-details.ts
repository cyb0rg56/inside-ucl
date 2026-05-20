import { useCallback } from 'react';

import { BASIC_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { PersonResponse, PersonalDetails } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function usePersonDetails(): AsyncResource<PersonalDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<PersonResponse>('/person/', BASIC_DETAILS[0], { signal });
    return data.personal_details;
  }, []);

  return useAsyncResource(loader);
}
