import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { VideoPanel } from '@/components/interview/VideoPanel';
import { useMediaStream } from '@/hooks/useMediaStream';
import { useInterviewStore } from '@/store/interviewStore';
import { mockInterviews } from '@/mocks/interviews';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/authStore';

export default function SetupPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const { stream, videoRef, isCameraOn, isMicOn, error, isLoading, startStream, toggleCamera, toggleMic } = useMediaStream();
  const initRoom = useInterviewStore(s => s.initRoom);

  const interview = mockInterviews.find(i => i.id === id) || mockInterviews[0];

  useEffect(() => {
    startStream();
  }, [startStream]);

  const handleJoin = () => {
    if (id) {
      initRoom(id, interview.durationMinutes * 60);
      navigate(ROUTES.INTERVIEW.ROOM.replace(':id', id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 font-semibold text-white">
          <div className="w-8 h-8 rounded-card-sm bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          InterviewAI
        </div>
        <div className="text-sm font-medium text-neutral-400">
          Ready to join?
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-5 gap-8 items-center">
          
          {/* Video Preview */}
          <div className="lg:col-span-3 space-y-4">
            <div className="aspect-video relative rounded-card-lg overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Camera/Microphone Access Required</h3>
                  <p className="text-neutral-400 text-sm max-w-sm mb-6">
                    Please allow access to your camera and microphone in your browser settings to proceed with the interview.
                  </p>
                  <Button onClick={startStream} isLoading={isLoading}>Try Again</Button>
                </div>
              ) : (
                <VideoPanel
                  stream={stream}
                  videoRef={videoRef}
                  isMicOn={isMicOn}
                  isCameraOn={isCameraOn}
                  name={user?.email || 'Candidate'}
                  isLocal
                  className="w-full h-full border-none rounded-none"
                />
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant={isMicOn ? 'secondary' : 'danger'}
                onClick={toggleMic}
                leftIcon={isMicOn ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                disabled={!!error}
              >
                {isMicOn ? 'Mute' : 'Unmute'}
              </Button>
              <Button
                variant={isCameraOn ? 'secondary' : 'danger'}
                onClick={toggleCamera}
                leftIcon={isCameraOn ? <Camera className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                disabled={!!error}
              >
                {isCameraOn ? 'Stop Video' : 'Start Video'}
              </Button>
            </div>
          </div>

          {/* Details & Join */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{interview.title}</h1>
              <p className="text-neutral-400 text-lg">{interview.companyName}</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-card p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white">AI-Powered Evaluation</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    This interview is conducted by an AI. Your audio and video will be analyzed to evaluate technical skills, communication, and problem-solving.
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-neutral-800" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400">Duration</span>
                <span className="text-white font-medium">{interview.durationMinutes} Minutes</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400">Difficulty</span>
                <span className="text-white font-medium capitalize">{interview.difficulty}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg"
              disabled={!!error || isLoading}
              onClick={handleJoin}
            >
              Join Interview
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
