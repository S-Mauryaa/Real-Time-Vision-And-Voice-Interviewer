import apiClient from './apiClient';
import type { LoginPayload, RegisterPayload, User, ApiResponse } from '@/types';

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<ApiResponse<{ user: User; token: string }>>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<ApiResponse<{ user: User; token: string }>>('/auth/register', payload),

  logout: () => apiClient.post('/auth/logout'),

  me: () => apiClient.get<ApiResponse<User>>('/auth/me'),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),
};
