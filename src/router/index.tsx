import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/authStore';

// Landing & Auth
import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Candidate
import CandidateDashboard from '@/pages/candidate/CandidateDashboard';
import CandidateInterviews from '@/pages/candidate/InterviewsPage';
import CandidateResults from '@/pages/candidate/ResultsPage';
import CandidateResume from '@/pages/candidate/ResumePage';
import CandidateProfile from '@/pages/candidate/ProfilePage';

// Company
import CompanyDashboard from '@/pages/company/CompanyDashboard';
import CompanyInterviews from '@/pages/company/CompanyDashboard'; // Temporarily reusing dashboard for list
import CompanyCreate from '@/pages/company/CreateInterviewPage';
import CompanyCandidates from '@/pages/company/CandidatesPage';
import CompanyResults from '@/pages/company/ResultsPage';
import CompanyProfile from '@/pages/company/ProfilePage';

// Interview
import SetupPage from '@/pages/interview/SetupPage';
import InterviewPage from '@/pages/interview/InterviewPage';
import CompletePage from '@/pages/interview/CompletePage';

const ProtectedRoute = ({ allowedRole }: { allowedRole?: 'candidate' | 'company' }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'candidate' ? ROUTES.CANDIDATE.DASHBOARD : ROUTES.COMPANY.DASHBOARD} replace />;
  }
  
  return <Outlet />;
};

export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <LandingPage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <LoginPage /> }, // Reuse login for now

  // Candidate Routes
  {
    element: <ProtectedRoute allowedRole="candidate" />,
    children: [
      { path: ROUTES.CANDIDATE.DASHBOARD, element: <CandidateDashboard /> },
      { path: ROUTES.CANDIDATE.INTERVIEWS, element: <CandidateInterviews /> },
      { path: ROUTES.CANDIDATE.RESULTS, element: <CandidateResults /> },
      { path: ROUTES.CANDIDATE.RESUME, element: <CandidateResume /> },
      { path: ROUTES.CANDIDATE.PROFILE, element: <CandidateProfile /> },
    ],
  },

  // Company Routes
  {
    element: <ProtectedRoute allowedRole="company" />,
    children: [
      { path: ROUTES.COMPANY.DASHBOARD, element: <CompanyDashboard /> },
      { path: ROUTES.COMPANY.INTERVIEWS, element: <CompanyInterviews /> },
      { path: ROUTES.COMPANY.CREATE, element: <CompanyCreate /> },
      { path: ROUTES.COMPANY.CANDIDATES, element: <CompanyCandidates /> },
      { path: ROUTES.COMPANY.RESULTS, element: <CompanyResults /> },
      { path: ROUTES.COMPANY.PROFILE, element: <CompanyProfile /> },
    ],
  },

  // Interview Room (requires auth for now, but could be adapted for public links)
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.INTERVIEW.SETUP, element: <SetupPage /> },
      { path: ROUTES.INTERVIEW.ROOM, element: <InterviewPage /> },
      { path: ROUTES.INTERVIEW.COMPLETE, element: <CompletePage /> },
    ],
  },

  { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
]);
