import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Scorecard } from '@/components/scorecard/Scorecard';
import { mockScores } from '@/mocks/scores';
import { mockInterviews } from '@/mocks/interviews';
import { useState } from 'react';
import { clsx } from '@/utils';

export default function ResultsPage() {
  const [selectedId, setSelectedId] = useState<string>(mockInterviews[0].id);
  const completedInterviews = mockInterviews.filter(i => i.status === 'completed');
  const selectedInterview = completedInterviews.find(i => i.id === selectedId);
  const selectedScore = selectedInterview && selectedInterview.id in mockScores ? mockScores[selectedInterview.id] : null;

  return (
    <DashboardLayout title="Interview Results">
      {completedInterviews.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No completed interviews yet.</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* List */}
          <div className="lg:w-80 shrink-0 flex flex-col gap-2">
            {completedInterviews.map(i => (
              <button
                key={i.id}
                onClick={() => setSelectedId(i.id)}
                className={clsx(
                  'text-left p-4 rounded-card border transition-all duration-200',
                  selectedId === i.id ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border bg-white hover:border-primary/40'
                )}
              >
                <div className="font-medium text-text mb-1">{i.title}</div>
                <div className="text-xs text-text-secondary">{i.companyName}</div>
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            {selectedScore && selectedInterview ? (
              <Scorecard score={selectedScore} interview={selectedInterview} role="candidate" />
            ) : (
              <div className="bg-white p-8 rounded-card border border-border text-center text-text-muted">
                Scorecard processing...
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
