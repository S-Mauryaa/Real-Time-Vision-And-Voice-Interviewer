import type { Candidate } from '@/types';

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-001',
    userId: 'user-001',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    headline: 'Full Stack Engineer · 5 years exp',
    location: 'San Francisco, CA',
    phone: '+1 (415) 555-0101',
    linkedinUrl: 'https://linkedin.com/in/alexmorgan',
    githubUrl: 'https://github.com/alexmorgan',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    experience: [
      {
        id: 'exp-001',
        company: 'TechCorp Inc.',
        role: 'Senior Software Engineer',
        startDate: '2021-03',
        isCurrent: true,
        description: 'Led frontend architecture for a SaaS platform serving 200k+ users.',
      },
      {
        id: 'exp-002',
        company: 'StartupXYZ',
        role: 'Software Engineer',
        startDate: '2019-06',
        endDate: '2021-02',
        isCurrent: false,
        description: 'Built and maintained React/Node.js applications.',
      },
    ],
    education: [
      {
        id: 'edu-001',
        institution: 'UC Berkeley',
        degree: 'B.Sc.',
        field: 'Computer Science',
        startDate: '2015-08',
        endDate: '2019-05',
      },
    ],
    stats: {
      totalInterviews: 8,
      completedInterviews: 6,
      averageScore: 78,
      topSkill: 'React',
    },
  },
];

export const mockCurrentCandidate = mockCandidates[0];
