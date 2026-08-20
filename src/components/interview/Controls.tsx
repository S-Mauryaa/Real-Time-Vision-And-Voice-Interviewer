import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from 'lucide-react';
import { clsx } from '@/utils';

interface ControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onEndInterview: () => void;
  onToggleChat?: () => void;
}

export function Controls({ isMicOn, isCameraOn, onToggleMic, onToggleCamera, onEndInterview, onToggleChat }: ControlsProps) {
  return (
    <div className="flex items-center gap-4 bg-neutral-900 px-6 py-3 rounded-full border border-neutral-800 shadow-modal">
      <button
        onClick={onToggleMic}
        className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
          isMicOn ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-error text-white hover:bg-red-700'
        )}
        title={isMicOn ? 'Mute' : 'Unmute'}
      >
        {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>

      <button
        onClick={onToggleCamera}
        className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
          isCameraOn ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-error text-white hover:bg-red-700'
        )}
        title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
      >
        {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      </button>

      {onToggleChat && (
        <button
          onClick={onToggleChat}
          className="w-12 h-12 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 flex items-center justify-center transition-colors"
          title="Toggle Chat/Transcript"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

      <div className="w-px h-8 bg-neutral-800 mx-2" />

      <button
        onClick={onEndInterview}
        className="px-6 h-12 rounded-full bg-error text-white hover:bg-red-700 font-medium flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.8)]"
      >
        <PhoneOff className="w-5 h-5" />
        End Interview
      </button>
    </div>
  );
}
