import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/constants';
import { useMediaStream } from '@/hooks/useMediaStream';
import { useEffect } from 'react';

export default function CompletePage() {
  const { stopStream } = useMediaStream();

  // Ensure stream is stopped
  useEffect(() => {
    stopStream();
  }, [stopStream]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-card-lg border border-border shadow-card max-w-lg w-full flex flex-col items-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-text mb-4">Interview Complete!</h1>
        
        <p className="text-text-secondary mb-8 leading-relaxed">
          Great job! Your responses have been recorded and your scorecard is being generated.
          You'll be able to view your results in your dashboard shortly.
        </p>

        <Link to={ROUTES.CANDIDATE.RESULTS} className="w-full">
          <Button size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Results
          </Button>
        </Link>
        <Link to={ROUTES.CANDIDATE.DASHBOARD} className="w-full mt-3">
          <Button size="lg" variant="ghost" className="w-full">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
