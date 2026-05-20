import { useCallback } from 'react';

import { EDUCATION_QUALIFICATIONS } from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import type { EducationQualification, EducationQualificationsResponse } from '@/types/person';

import { useAsyncResource, type AsyncResource } from './use-async-resource';

export function useEducationQualifications(): AsyncResource<EducationQualification[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetchWithFallback<EducationQualificationsResponse>(
      '/person/education-qualifications',
      EDUCATION_QUALIFICATIONS[0],
      { signal },
    );
    return data.education_and_qualifications_collection.education_and_qualifications;
  }, []);

  return useAsyncResource(loader);
}
