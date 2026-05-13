import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { ContactDetails, ContactDetailsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useContactDetails(): AsyncResource<ContactDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<ContactDetailsResponse>('/person/contact-details', { signal });
    return data.contact_details;
  }, []);

  return useAsyncResource(loader);
}
