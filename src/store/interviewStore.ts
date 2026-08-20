import { create } from 'zustand';
import type { InterviewRoomState, InterviewPhase, TranscriptEntry } from '@/types';

interface InterviewStore extends InterviewRoomState {
  initRoom: (interviewId: string, totalSeconds: number) => void;
  setPhase: (phase: InterviewPhase) => void;
  tick: () => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  setAISpeaking: (v: boolean) => void;
  setQuestion: (q: string, index: number, total: number) => void;
  addTranscript: (entry: TranscriptEntry) => void;
  setConnectionStatus: (s: InterviewRoomState['connectionStatus']) => void;
  reset: () => void;
}

const initialState: InterviewRoomState = {
  interviewId: null,
  phase: 'setup',
  elapsedSeconds: 0,
  totalSeconds: 1800,
  isMicOn: true,
  isCameraOn: true,
  isAISpeaking: false,
  currentQuestion: null,
  questionIndex: 0,
  totalQuestions: 0,
  transcript: [],
  connectionStatus: 'disconnected',
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  ...initialState,

  initRoom: (interviewId, totalSeconds) =>
    set({ ...initialState, interviewId, totalSeconds, phase: 'intro', connectionStatus: 'connecting' }),

  setPhase: (phase) => set({ phase }),

  tick: () => set((s) => ({ elapsedSeconds: s.elapsedSeconds + 1 })),

  toggleMic: () => set((s) => ({ isMicOn: !s.isMicOn })),

  toggleCamera: () => set((s) => ({ isCameraOn: !s.isCameraOn })),

  setAISpeaking: (v) => set({ isAISpeaking: v }),

  setQuestion: (q, index, total) =>
    set({ currentQuestion: q, questionIndex: index, totalQuestions: total }),

  addTranscript: (entry) =>
    set((s) => ({ transcript: [...s.transcript, entry] })),

  setConnectionStatus: (s) => set({ connectionStatus: s }),

  reset: () => set(initialState),
}));
