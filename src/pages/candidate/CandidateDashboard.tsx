import { Link } from 'react-router-dom';
import { Calendar, Clock, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/common/StatCard';
import { Button } from '@/components/common/Button';
import { StatusBadge, DifficultyBadge } from '@/components/common/Badge';
import { useAuthStore } from '@/store/authStore';
import { mockInterviews } from '@/mocks/interviews';
import { mockCurrentCandidate } from '@/mocks/candidates';
import { formatDate, formatTime } from '@/utils';
import { ROUTES } from '@/constants';

export default function CandidateDashboard() {
  const user = useAuthStore((s) => s.user);
  const candidate = mockCurrentCandidate;
  const recentInterviews = mockInterviews.slice(0, 4);
  const firstName = user?.email?.split('@')[0] ?? 'there';

  return (
    <DashboardLayout title="Dashboard">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-heading-2 font-bold text-text">Good morning, {firstName} 👋</h2>
        <p className="mt-1 text-text-secondary text-sm">Here's an overview of your interview activity.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Interviews"
          value={candidate.stats.totalInterviews}
          icon={<Calendar className="w-5 h-5" />}
          trend={{ value: 12, label: 'this month' }}
        />
        <StatCard
          label="Completed"
          value={candidate.stats.completedInterviews}
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          label="Average Score"
          value={`${candidate.stats.averageScore}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 5, label: 'vs last month' }}
          accent
        />
        <StatCard
          label="Top Skill"
          value={candidate.stats.topSkill}
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      {/* Recent interviews */}
      <div className="bg-white rounded-card-lg border border-border shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-text">Recent Interviews</h3>
          <Link to={ROUTES.CANDIDATE.INTERVIEWS}>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View all
            </Button>
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors">
              {/* Company avatar */}
              <div className="w-10 h-10 rounded-card-sm bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                {interview.companyName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text text-sm truncate">{interview.title}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {interview.companyName} · {interview.scheduledAt ? formatDate(interview.scheduledAt) : 'TBD'} · {formatTime(interview.durationMinutes * 60)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <DifficultyBadge difficulty={interview.difficulty} />
                <StatusBadge status={interview.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
