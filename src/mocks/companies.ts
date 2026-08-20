import type { Company } from '@/types';

export const mockCompanies: Company[] = [
  {
    id: 'comp-001',
    userId: 'user-002',
    name: 'Acme Technologies',
    email: 'hr@acmetech.io',
    industry: 'Software & Technology',
    size: '201–500',
    website: 'https://acmetech.io',
    location: 'New York, NY',
    description:
      'We build next-generation developer tooling and cloud infrastructure solutions.',
    stats: {
      totalInterviews: 42,
      activeInterviews: 7,
      totalCandidates: 38,
      averageScore: 72,
    },
  },
];

export const mockCurrentCompany = mockCompanies[0];
