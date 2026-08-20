import { Link } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, CheckCircle, ArrowRight, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/common/StatCard';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/common/Badge';
import { useAuthStore } from '@/store/authStore';
import { mockCurrentCompany } from '@/mocks/companies';
import { mockInterviews } from '@/mocks/interviews';
import { ROUTES } from '@/constants';

export default function CompanyDashboard() {
  const user = useAuthStore((s) => s.user);
  const company = mockCurrentCompany;
  const recentInterviews = mockInterviews.slice(0, 4);

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-heading-2 font-bold text-text">Welcome back, {company.name}</h2>
          <p className="mt-1 text-text-secondary text-sm">Here's what's happening with your hiring pipeline.</p>
        </div>
        <Link to={ROUTES.COMPANY.CREATE}>
          <Button leftIcon={<Plus className="w-4 h-4" />}>Create Interview</Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Candidates"
          value={company.stats.totalCandidates}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 24, label: 'vs last month' }}
        />
        <StatCard
          label="Active Interviews"
          value={company.stats.activeInterviews}
          icon={<Briefcase className="w-5 h-5" />}
          accent
        />
        <StatCard
          label="Avg Candidate Score"
          value={`${company.stats.averageScore}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 2, label: 'this week' }}
        />
        <StatCard
          label="Completed"
          value={company.stats.totalInterviews}
          icon={<CheckCircle className="w-5 h-5" />}
        />
      </div>

      <div className="bg-white rounded-card-lg border border-border shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-text">Recent Activity</h3>
          <Link to={ROUTES.COMPANY.INTERVIEWS}>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View all
            </Button>
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-text truncate">{interview.title}</h4>
                  <StatusBadge status={interview.status} />
                </div>
                <p className="text-sm text-text-secondary">
                  {interview.candidateName || 'Pending Candidate'} · {interview.role}
                </p>
              </div>
              {interview.status === 'completed' && (
                <Link to={ROUTES.COMPANY.RESULTS}>
                  <Button size="sm" variant="outline">View Results</Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
