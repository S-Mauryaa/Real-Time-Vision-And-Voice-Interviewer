import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockCandidates } from '@/mocks/candidates';
import { Avatar } from '@/components/common/Avatar';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Search, Mail, ExternalLink, Download } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

export default function CandidatesPage() {
  return (
    <DashboardLayout title="Candidate Pool">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="flex-1 w-full max-w-sm">
          <Input placeholder="Search candidates by name or skill..." leftIcon={<Search className="w-4 h-4" />} />
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export CSV</Button>
      </div>

      <div className="bg-white border border-border rounded-card shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Top Skills</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-center">Avg Score</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCandidates.map(candidate => (
              <tr key={candidate.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={candidate.name} size="md" />
                    <div>
                      <div className="font-medium text-text text-sm">{candidate.name}</div>
                      <div className="text-xs text-text-secondary">{candidate.headline}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} size="sm" variant="default">{skill}</Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge size="sm" variant="default">+{candidate.skills.length - 3}</Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-semibold text-text">{candidate.stats.averageScore}%</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" className="text-text-secondary hover:text-primary"><Mail className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" className="text-text-secondary hover:text-primary"><ExternalLink className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
