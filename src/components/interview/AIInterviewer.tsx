import { Brain } from 'lucide-react';
import { clsx } from '@/utils';
import { useInterviewStore } from '@/store/interviewStore';

interface AIInterviewerProps {
  className?: string;
}

export function AIInterviewer({ className }: AIInterviewerProps) {
  const isSpeaking = useInterviewStore(s => s.isAISpeaking);

  return (
    <div className={clsx('relative bg-neutral-900 rounded-card-lg overflow-hidden border border-neutral-800 flex flex-col items-center justify-center', className)}>
      {/* Visualizer */}
      <div className={clsx('w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500', isSpeaking ? 'bg-primary/20 scale-110 shadow-[0_0_40px_rgba(143,162,138,0.4)]' : 'bg-neutral-800')}>
        <Brain className={clsx('w-16 h-16 transition-colors duration-500', isSpeaking ? 'text-primary' : 'text-neutral-500')} />
      </div>
      
      <p className="mt-8 text-neutral-400 font-medium">AI Interviewer</p>
      
      {/* Audio waves when speaking */}
      <div className="absolute bottom-8 flex items-end gap-1.5 h-8">
        {isSpeaking ? (
          [3, 6, 9, 5, 7, 10, 4, 8, 6, 3, 7, 5].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-primary animate-waveform"
              style={{ height: `${h * 2}px`, animationDelay: `${i * 0.07}s` }}
            />
          ))
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
        )}
      </div>

      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1.5 rounded-card-sm flex items-center gap-2">
        <span className="text-white text-sm font-medium">Interviewer (AI)</span>
      </div>
    </div>
  );
}
