import { Star, TrendingUp, CheckCircle, AlertCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { clsx, scoreColor, scoreLabel } from '@/utils';
import type { InterviewScore, Interview } from '@/types';

interface ScorecardProps {
  score: InterviewScore;
  interview: Interview;
  role: 'candidate' | 'company';
}

export function Scorecard({ score, interview, role }: ScorecardProps) {
  const getRecommendationBadge = (rec: InterviewScore['recommendation']) => {
    const map = {
      strong_yes: { label: 'Strong Yes', color: 'bg-success/20 text-success' },
      yes: { label: 'Yes', color: 'bg-primary/20 text-primary-dark' },
      maybe: { label: 'Maybe', color: 'bg-warning/20 text-warning' },
      no: { label: 'No', color: 'bg-error/20 text-error' },
    };
    const mapped = map[rec];
    return <span className={clsx('px-3 py-1 rounded-full text-sm font-semibold', mapped.color)}>{mapped.label}</span>;
  };

  return (
    <div className="bg-white rounded-card-lg border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-neutral-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text">{interview.title}</h2>
          <p className="text-sm text-text-secondary mt-1">
            {role === 'company' ? `Candidate: ${interview.candidateName}` : `Company: ${interview.companyName}`} · {interview.role}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>PDF</Button>
          {role === 'company' && getRecommendationBadge(score.recommendation)}
        </div>
      </div>

      <div className="p-6">
        {/* Top level scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-card border border-border text-center bg-primary/5">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Overall Score</div>
            <div className={clsx('text-4xl font-bold mb-1', scoreColor(score.overall))}>{score.overall}%</div>
            <div className="text-xs font-medium text-primary-dark">{scoreLabel(score.overall)}</div>
          </div>
          <div className="p-4 rounded-card border border-border text-center flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Technical</div>
            <div className="text-2xl font-bold text-text">{score.technical}%</div>
          </div>
          <div className="p-4 rounded-card border border-border text-center flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Communication</div>
            <div className="text-2xl font-bold text-text">{score.communication}%</div>
          </div>
          <div className="p-4 rounded-card border border-border text-center flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Problem Solving</div>
            <div className="text-2xl font-bold text-text">{score.problemSolving}%</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              Strengths
            </h3>
            <ul className="space-y-3">
              {score.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  {str}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-warning" />
              Areas for Improvement
            </h3>
            <ul className="space-y-3">
              {score.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mb-8">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-text-muted" />
            AI Summary & Feedback
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed bg-neutral-50 p-4 rounded-card">
            {score.feedback}
          </p>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="font-semibold text-text mb-4">Topic Breakdown</h3>
          <div className="space-y-4">
            {score.breakdown.map((item, i) => {
              const percentage = Math.round((item.score / item.maxScore) * 100);
              return (
                <div key={i} className="bg-white border border-border rounded-card p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm text-text">{item.category}</span>
                    <span className="text-sm font-semibold text-text">{item.score} / {item.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-3">
                    <div 
                      className={clsx('h-full', percentage >= 80 ? 'bg-success' : percentage >= 60 ? 'bg-warning' : 'bg-error')}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-secondary">{item.notes}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
