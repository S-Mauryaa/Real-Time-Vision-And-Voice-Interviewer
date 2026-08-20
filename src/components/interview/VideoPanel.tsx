import React from 'react';
import { MicOff, VideoOff } from 'lucide-react';
import { clsx } from '@/utils';

interface VideoPanelProps {
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isMicOn: boolean;
  isCameraOn: boolean;
  name: string;
  className?: string;
  isLocal?: boolean;
}

export function VideoPanel({ stream, videoRef, isMicOn, isCameraOn, name, className, isLocal }: VideoPanelProps) {
  return (
    <div className={clsx('relative bg-neutral-900 rounded-card-lg overflow-hidden border border-neutral-800', className)}>
      {isCameraOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-3xl font-semibold text-neutral-400 mb-4">
            {name.charAt(0)}
          </div>
          <p className="text-neutral-400 font-medium">{name}</p>
        </div>
      )}

      {/* Name tag and status */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1.5 rounded-card-sm flex items-center gap-2">
        <span className="text-white text-sm font-medium">{name}</span>
        {(!isMicOn || !isCameraOn) && (
          <div className="flex gap-1.5 text-error">
            {!isMicOn && <MicOff className="w-4 h-4" />}
            {!isCameraOn && <VideoOff className="w-4 h-4" />}
          </div>
        )}
      </div>
    </div>
  );
}
