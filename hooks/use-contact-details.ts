import { useCallback } from 'react';

import { CONTACT_DETAILS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { ContactDetails, ContactDetailsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useContactDetails(): AsyncResource<ContactDetails> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<ContactDetailsResponse>(
      '/person/contact-details',
      CONTACT_DETAILS[0],
      { signal },
    );
    return data.contact_details;
  }, []);

  return useAsyncResource(loader);
}
