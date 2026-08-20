import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Clock } from 'lucide-react';
import { useMediaStream } from '@/hooks/useMediaStream';
import { useInterviewStore } from '@/store/interviewStore';
import { useInterviewTimer } from '@/hooks/useInterviewTimer';
import { useAuthStore } from '@/store/authStore';
import { VideoPanel } from '@/components/interview/VideoPanel';
import { AIInterviewer } from '@/components/interview/AIInterviewer';
import { Controls } from '@/components/interview/Controls';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { formatTime } from '@/utils';
import { ROUTES } from '@/constants';

export default function InterviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const { stream, videoRef, startStream, toggleCamera, toggleMic, isCameraOn, isMicOn } = useMediaStream();
  const { phase, setPhase, isAISpeaking, setAISpeaking } = useInterviewStore();
  const { remaining, progress } = useInterviewTimer(phase !== 'setup' && phase !== 'complete');
  
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);

  useEffect(() => {
    // If we land here directly without setup, start stream
    if (!stream) startStream();
  }, [stream, startStream]);

  // Mock interview progression
  useEffect(() => {
    if (phase === 'intro') {
      setTimeout(() => setAISpeaking(true), 1000);
      setTimeout(() => {
        setAISpeaking(false);
        setPhase('technical');
      }, 5000);
    }
  }, [phase, setPhase, setAISpeaking]);

  // Handle timeout
  useEffect(() => {
    if (remaining <= 0 && phase !== 'setup' && phase !== 'complete') {
      handleEndInterview();
    }
  }, [remaining, phase]);

  const handleEndInterview = useCallback(() => {
    setPhase('complete');
    if (id) navigate(ROUTES.INTERVIEW.COMPLETE.replace(':id', id));
  }, [id, navigate, setPhase]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      {/* Top Bar */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 font-semibold text-white pointer-events-auto">
          <div className="w-8 h-8 rounded-card-sm bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          InterviewAI
        </div>
        
        {/* Timer */}
        <div className="pointer-events-auto flex items-center gap-4 bg-neutral-900/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span className={`font-mono font-medium ${remaining < 300 ? 'text-error' : 'text-white'}`}>
              {formatTime(remaining)}
            </span>
          </div>
          <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${remaining < 300 ? 'bg-error' : 'bg-primary'}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-6 pt-24 pb-32 grid lg:grid-cols-2 gap-6 relative">
        <AIInterviewer className="w-full h-full min-h-[400px]" />
        
        <VideoPanel
          stream={stream}
          videoRef={videoRef}
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          name={user?.email || 'Candidate'}
          isLocal
          className="w-full h-full min-h-[400px]"
        />

        {/* Live Captions */}
        <AnimatePresence>
          {isAISpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 max-w-2xl w-full text-center z-20"
            >
              <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                <p className="text-lg font-medium text-white/90">
                  Can you walk me through the architecture of a React application?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <Controls
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          onToggleMic={toggleMic}
          onToggleCamera={toggleCamera}
          onEndInterview={() => setShowConfirmEnd(true)}
        />
      </div>

      {/* Confirm End Modal */}
      <Modal isOpen={showConfirmEnd} onClose={() => setShowConfirmEnd(false)} title="End Interview?">
        <div className="text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-text-secondary text-sm mb-6">
            Are you sure you want to end this interview early? Your scorecard will be generated based only on the questions answered so far.
          </p>
          <div className="flex gap-3">
            <Button className="flex-1" variant="secondary" onClick={() => setShowConfirmEnd(false)}>Resume</Button>
            <Button className="flex-1" variant="danger" onClick={handleEndInterview}>End Interview</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
