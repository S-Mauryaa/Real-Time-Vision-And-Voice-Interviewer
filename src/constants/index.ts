export const APP_NAME = 'InterviewAI';
export const APP_TAGLINE = 'AI-Powered Technical Interviews';

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';
export const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000/ws';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    INTERVIEWS: '/candidate/interviews',
    RESULTS: '/candidate/results',
    RESUME: '/candidate/resume',
    PROFILE: '/candidate/profile',
  },

  COMPANY: {
    DASHBOARD: '/company/dashboard',
    INTERVIEWS: '/company/interviews',
    CREATE: '/company/interviews/create',
    CANDIDATES: '/company/candidates',
    RESULTS: '/company/results',
    PROFILE: '/company/profile',
  },

  INTERVIEW: {
    SETUP: '/interview/:id/setup',
    ROOM: '/interview/:id/room',
    COMPLETE: '/interview/:id/complete',
  },
} as const;

export const INTERVIEW_TOPICS = [
  'Data Structures',
  'Algorithms',
  'System Design',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'SQL',
  'REST APIs',
  'AWS',
  'Docker',
  'CI/CD',
  'Leadership',
  'Communication',
  'Problem Solving',
];

export const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;

export const STATUS_LABELS = {
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  pending: 'Pending',
} as const;

export const RECOMMENDATION_LABELS = {
  strong_yes: 'Strong Yes',
  yes: 'Yes',
  maybe: 'Maybe',
  no: 'No',
} as const;

export const MAX_INTERVIEW_DURATION = 3600; // 60 minutes
export const DEFAULT_INTERVIEW_DURATION = 1800; // 30 minutes
