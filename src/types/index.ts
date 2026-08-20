// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = 'candidate' | 'company';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

// ─── Candidate ───────────────────────────────────────────────────────────────

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  headline: string;
  location: string;
  phone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  stats: CandidateStats;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export interface CandidateStats {
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  topSkill: string;
}

// ─── Company ─────────────────────────────────────────────────────────────────

export interface Company {
  id: string;
  userId: string;
  name: string;
  email: string;
  logo?: string;
  industry: string;
  size: string;
  website?: string;
  location: string;
  description: string;
  stats: CompanyStats;
}

export interface CompanyStats {
  totalInterviews: number;
  activeInterviews: number;
  totalCandidates: number;
  averageScore: number;
}

// ─── Interview ───────────────────────────────────────────────────────────────

export type InterviewStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'pending';

export type InterviewDifficulty = 'easy' | 'medium' | 'hard';

export interface Interview {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  candidateId?: string;
  candidateName?: string;
  role: string;
  status: InterviewStatus;
  difficulty: InterviewDifficulty;
  durationMinutes: number;
  scheduledAt?: string;
  completedAt?: string;
  topics: string[];
  description: string;
  inviteCode?: string;
  score?: InterviewScore;
}

// ─── Score ───────────────────────────────────────────────────────────────────

export interface InterviewScore {
  interviewId: string;
  overall: number;
  technical: number;
  communication: number;
  problemSolving: number;
  confidence: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no';
  breakdown: ScoreBreakdown[];
}

export interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  notes: string;
}

// ─── Interview Room ───────────────────────────────────────────────────────────

export type InterviewPhase =
  | 'setup'
  | 'intro'
  | 'technical'
  | 'behavioral'
  | 'qa'
  | 'complete';

export interface InterviewRoomState {
  interviewId: string | null;
  phase: InterviewPhase;
  elapsedSeconds: number;
  totalSeconds: number;
  isMicOn: boolean;
  isCameraOn: boolean;
  isAISpeaking: boolean;
  currentQuestion: string | null;
  questionIndex: number;
  totalQuestions: number;
  transcript: TranscriptEntry[];
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
}

export interface TranscriptEntry {
  id: string;
  speaker: 'ai' | 'candidate';
  text: string;
  timestamp: number;
}

// ─── WebSocket ───────────────────────────────────────────────────────────────

export type SocketEventType =
  | 'question'
  | 'transcript'
  | 'phase_change'
  | 'score_update'
  | 'interview_end'
  | 'heartbeat';

export interface SocketMessage {
  type: SocketEventType;
  payload: unknown;
  timestamp: number;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}
