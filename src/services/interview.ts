import apiClient from './apiClient';
import type { Interview, InterviewScore, ApiResponse, PaginatedResponse } from '@/types';

export const interviewApi = {
  list: (params?: { status?: string; page?: number }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Interview>>>('/interviews', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Interview>>(`/interviews/${id}`),

  create: (payload: Partial<Interview>) =>
    apiClient.post<ApiResponse<Interview>>('/interviews', payload),

  update: (id: string, payload: Partial<Interview>) =>
    apiClient.patch<ApiResponse<Interview>>(`/interviews/${id}`, payload),

  delete: (id: string) => apiClient.delete(`/interviews/${id}`),

  getScore: (id: string) =>
    apiClient.get<ApiResponse<InterviewScore>>(`/interviews/${id}/score`),

  join: (inviteCode: string) =>
    apiClient.post<ApiResponse<Interview>>('/interviews/join', { inviteCode }),
};
