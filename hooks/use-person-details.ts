import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { PersonResponse, PersonalDetails } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function usePersonDetails(): AsyncResource<PersonalDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<PersonResponse>('/person/', { signal });
    return data.personal_details;
  }, []);

  return useAsyncResource(loader);
}
