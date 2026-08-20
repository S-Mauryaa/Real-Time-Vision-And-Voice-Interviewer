import { useEffect, useRef } from 'react';
import { useInterviewStore } from '@/store/interviewStore';

export function useInterviewTimer(running: boolean) {
  const tick = useInterviewStore((s) => s.tick);
  const elapsedSeconds = useInterviewStore((s) => s.elapsedSeconds);
  const totalSeconds = useInterviewStore((s) => s.totalSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, tick]);

  const remaining = Math.max(0, totalSeconds - elapsedSeconds);
  const progress = totalSeconds > 0 ? (elapsedSeconds / totalSeconds) * 100 : 0;

  return { elapsedSeconds, remaining, progress };
}
