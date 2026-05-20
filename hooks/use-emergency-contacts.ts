import { useCallback } from 'react';

import { EMERGENCY_CONTACTS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { EmergencyContact, EmergencyContactResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEmergencyContacts(): AsyncResource<EmergencyContact[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<EmergencyContactResponse>(
      '/person/emergency-contact',
      EMERGENCY_CONTACTS[0],
      { signal },
    );
    return data.emergency_contact_collection.emergency_contact;
  }, []);

  return useAsyncResource(loader);
}
