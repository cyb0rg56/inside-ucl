import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { EmergencyContact, EmergencyContactResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEmergencyContacts(): AsyncResource<EmergencyContact[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<EmergencyContactResponse>('/person/emergency-contact', { signal });
    return data.emergency_contact_collection.emergency_contact;
  }, []);

  return useAsyncResource(loader);
}
