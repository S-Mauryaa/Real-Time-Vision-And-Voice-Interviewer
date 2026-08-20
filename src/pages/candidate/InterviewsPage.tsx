import { Link } from 'react-router-dom';
import { Play, FileText, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/common/Button';
import { StatusBadge, DifficultyBadge } from '@/components/common/Badge';
import { Input } from '@/components/common/Input';
import { mockInterviews } from '@/mocks/interviews';
import { formatDate, formatTime } from '@/utils';
import { ROUTES } from '@/constants';

export default function InterviewsPage() {
  return (
    <DashboardLayout title="My Interviews">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex-1 w-full max-w-sm">
          <Input placeholder="Search interviews..." />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
          <div className="flex bg-neutral-100 rounded-card-sm p-1">
            <button className="px-3 py-1.5 text-sm font-medium rounded bg-white shadow-sm text-text">Upcoming</button>
            <button className="px-3 py-1.5 text-sm font-medium rounded text-text-secondary hover:text-text transition-colors">Past</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockInterviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-card border border-border p-5 hover:shadow-card transition-shadow flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-12 h-12 rounded-card-sm bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg shrink-0">
              {interview.companyName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-text">{interview.title}</h3>
                <StatusBadge status={interview.status} />
              </div>
              <p className="text-sm text-text-secondary mb-3">
                {interview.companyName} · {interview.role}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <DifficultyBadge difficulty={interview.difficulty} />
                </span>
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" /> {formatTime(interview.durationMinutes * 60)}
                </span>
                {interview.scheduledAt && (
                  <span>Scheduled: {formatDate(interview.scheduledAt)}</span>
                )}
              </div>
            </div>
            <div className="shrink-0 flex flex-col gap-2 mt-4 md:mt-0">
              {interview.status === 'scheduled' || interview.status === 'pending' ? (
                <Link to={ROUTES.INTERVIEW.SETUP.replace(':id', interview.id)}>
                  <Button className="w-full md:w-auto" leftIcon={<Play className="w-4 h-4" />}>Start Interview</Button>
                </Link>
              ) : interview.status === 'completed' ? (
                <Link to={ROUTES.CANDIDATE.RESULTS}>
                  <Button variant="outline" className="w-full md:w-auto" leftIcon={<FileText className="w-4 h-4" />}>View Results</Button>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
