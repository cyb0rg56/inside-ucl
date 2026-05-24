export const queryKeys = {
  person: {
    all: ['person'] as const,
    personalDetails: () => [...queryKeys.person.all, 'personalDetails'] as const,
    contactDetails: () => [...queryKeys.person.all, 'contactDetails'] as const,
    edi: () => [...queryKeys.person.all, 'edi'] as const,
    disability: () => [...queryKeys.person.all, 'disability'] as const,
    education: () => [...queryKeys.person.all, 'education'] as const,
    emergencyContacts: () => [...queryKeys.person.all, 'emergencyContacts'] as const,
    employmentInfo: () => [...queryKeys.person.all, 'employmentInfo'] as const,
    bankDetails: () => [...queryKeys.person.all, 'bankDetails'] as const,
    payslip: () => [...queryKeys.person.all, 'payslip'] as const,
  },
  staffNews: {
    all: ['staffNews'] as const,
    list: () => [...queryKeys.staffNews.all, 'list'] as const,
  },
} as const;
