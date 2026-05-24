import { queryOptions } from '@tanstack/react-query';

import {
  BANK_DETAILS,
  BASIC_DETAILS,
  CONTACT_DETAILS,
  CONTRACT_DETAILS,
  DISABILITY_DETAILS,
  EDI_DETAILS,
  EDUCATION_QUALIFICATIONS,
  EMERGENCY_CONTACTS,
  PAYSLIP_DETAILS,
} from '@/constants/test-data';
import { apiFetchWithFallback } from '@/lib/api';
import { queryKeys } from '@/lib/queries/keys';
import type {
  BankDetails,
  ContactDetailsResponse,
  DisabilityDetailsResponse,
  EdiDetailsResponse,
  EducationQualificationsResponse,
  EmergencyContactResponse,
  EmploymentInfoResponse,
  Payslip,
  PersonResponse,
} from '@/types/person';

export const personQueries = {
  personalDetails: () =>
    queryOptions({
      queryKey: queryKeys.person.personalDetails(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<PersonResponse>('/person/', BASIC_DETAILS[0], {
          signal,
        });
        return data.personal_details;
      },
    }),

  contactDetails: () =>
    queryOptions({
      queryKey: queryKeys.person.contactDetails(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<ContactDetailsResponse>(
          '/person/contact-details',
          CONTACT_DETAILS[0],
          { signal },
        );
        return data.contact_details;
      },
    }),

  edi: () =>
    queryOptions({
      queryKey: queryKeys.person.edi(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<EdiDetailsResponse>(
          '/person/edi-details',
          EDI_DETAILS[0],
          { signal },
        );
        return data.edi;
      },
    }),

  disability: () =>
    queryOptions({
      queryKey: queryKeys.person.disability(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<DisabilityDetailsResponse>(
          '/person/disability-details',
          DISABILITY_DETAILS[0],
          { signal },
        );
        return data.disability_details;
      },
    }),

  education: () =>
    queryOptions({
      queryKey: queryKeys.person.education(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<EducationQualificationsResponse>(
          '/person/education-qualifications',
          EDUCATION_QUALIFICATIONS[0],
          { signal },
        );
        return data.education_and_qualifications_collection.education_and_qualifications;
      },
    }),

  emergencyContacts: () =>
    queryOptions({
      queryKey: queryKeys.person.emergencyContacts(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<EmergencyContactResponse>(
          '/person/emergency-contact',
          EMERGENCY_CONTACTS[0],
          { signal },
        );
        return data.emergency_contact_collection.emergency_contact;
      },
    }),

  employmentInfo: () =>
    queryOptions({
      queryKey: queryKeys.person.employmentInfo(),
      queryFn: async ({ signal }) => {
        const data = await apiFetchWithFallback<EmploymentInfoResponse>(
          '/person/employment-info',
          CONTRACT_DETAILS[0],
          { signal },
        );
        return data.employment_info_collection.employment_info;
      },
    }),

  bankDetails: () =>
    queryOptions({
      queryKey: queryKeys.person.bankDetails(),
      queryFn: async ({ signal }) => {
        return apiFetchWithFallback<BankDetails>('/person/bank-details', BANK_DETAILS[0], {
          signal,
        });
      },
    }),

  payslip: () =>
    queryOptions({
      queryKey: queryKeys.person.payslip(),
      queryFn: async ({ signal }) => {
        return apiFetchWithFallback<Payslip>('/person/payslip', PAYSLIP_DETAILS[0], { signal });
      },
    }),
};
