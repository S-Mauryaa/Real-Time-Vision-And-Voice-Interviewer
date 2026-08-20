import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { INTERVIEW_TOPICS, ROUTES } from '@/constants';
import type { InterviewDifficulty } from '@/types';
import { clsx } from '@/utils';

export default function CreateInterviewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('30');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('medium');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleTopic = (t: string) => {
    setSelectedTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to create interview
    const code = `INV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setInviteCode(code);
    setIsModalOpen(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${inviteCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="Create New Interview">
      <div className="max-w-3xl">
        <div className="bg-white p-6 rounded-card border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Interview Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Frontend Assessment" required />
              <Input label="Role" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer" required />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text">Duration (Minutes)</label>
                <select 
                  className="w-full h-10 rounded-card-sm border border-border bg-white text-sm px-3 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
                  value={duration} onChange={e => setDuration(e.target.value)}
                >
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text">Difficulty</label>
                <div className="flex bg-neutral-100 p-1 rounded-card-sm">
                  {(['easy', 'medium', 'hard'] as const).map(d => (
                    <button
                      key={d} type="button"
                      onClick={() => setDifficulty(d)}
                      className={clsx(
                        'flex-1 py-1.5 text-sm font-medium rounded capitalize transition-all',
                        difficulty === d ? 'bg-white shadow-sm text-text' : 'text-text-secondary hover:text-text'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-text">Topics Covered (Select up to 5)</label>
              <div className="flex flex-wrap gap-2">
                {INTERVIEW_TOPICS.map(topic => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      disabled={!isSelected && selectedTopics.length >= 5}
                      className={clsx(
                        'px-3 py-1.5 text-sm rounded-full border transition-colors',
                        isSelected 
                          ? 'bg-primary border-primary text-white' 
                          : 'bg-white border-border text-text-secondary hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={!title || !role || selectedTopics.length === 0}>Generate Interview Link</Button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Interview Created!" size="md">
        <div className="text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success mx-auto mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <p className="text-text-secondary text-sm mb-6">
            Your interview has been created. Share this link with candidates to let them take the assessment.
          </p>
          
          <div className="bg-neutral-50 border border-border rounded-card-sm p-3 flex items-center justify-between mb-6">
            <code className="text-sm font-mono text-text bg-transparent">{window.location.origin}/join/{inviteCode}</code>
            <Button size="sm" variant="outline" onClick={copyLink} leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          <Button className="w-full" onClick={() => navigate(ROUTES.COMPANY.INTERVIEWS)}>
            Go to Interviews
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
// Needed for icon since CheckCircle isn't imported from lucide-react above
import { CheckCircle } from 'lucide-react';
