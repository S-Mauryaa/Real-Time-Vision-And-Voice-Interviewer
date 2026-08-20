import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';
import type { UserRole } from '@/types';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (email: string, password: string, role: UserRole) => {
      login(email, password, role);
      if (role === 'candidate') navigate(ROUTES.CANDIDATE.DASHBOARD);
      else navigate(ROUTES.COMPANY.DASHBOARD);
    },
    [login, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate(ROUTES.HOME);
  }, [logout, navigate]);

  return { user, token, isAuthenticated, isLoading, login: handleLogin, logout: handleLogout };
}
