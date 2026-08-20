import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/common/Button';
import { Upload, File } from 'lucide-react';
import { mockCurrentCandidate } from '@/mocks/candidates';
import { Input } from '@/components/common/Input';

export default function ResumePage() {
  const candidate = mockCurrentCandidate;
  return (
    <DashboardLayout title="Resume & Experience">
      <div className="max-w-3xl space-y-8">
        <div className="bg-white p-6 rounded-card border border-border">
          <h3 className="font-semibold text-text mb-4">Resume Document</h3>
          <div className="border-2 border-dashed border-border rounded-card p-8 flex flex-col items-center justify-center text-center bg-neutral-50 hover:bg-neutral-100 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-text mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-text-muted mb-4">PDF, DOCX up to 5MB</p>
            <Button size="sm" variant="outline">Select File</Button>
          </div>
          
          <div className="mt-4 flex items-center gap-3 p-3 bg-white border border-border rounded-card-sm">
            <File className="w-8 h-8 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">alex_morgan_resume_2026.pdf</p>
              <p className="text-xs text-text-muted">Updated 2 months ago · 1.2 MB</p>
            </div>
            <Button size="sm" variant="ghost" className="text-error">Remove</Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">Experience</h3>
            <Button size="sm" variant="outline">Add Experience</Button>
          </div>
          <div className="space-y-6">
            {candidate.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-border pl-4 ml-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-text">{exp.role}</h4>
                    <p className="text-sm text-text-secondary">{exp.company}</p>
                  </div>
                  <span className="text-xs text-text-muted">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-text-secondary mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
