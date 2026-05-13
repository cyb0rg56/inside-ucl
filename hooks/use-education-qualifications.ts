import { useCallback } from 'react';

import { apiFetch } from '@/lib/api';
import type { EducationQualification, EducationQualificationsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEducationQualifications(): AsyncResource<EducationQualification[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<EducationQualificationsResponse>(
      '/person/education-qualifications',
      { signal },
    );
    return data.education_and_qualifications_collection.education_and_qualifications;
  }, []);

  return useAsyncResource(loader);
}
