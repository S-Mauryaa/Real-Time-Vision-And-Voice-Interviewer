import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { mockCurrentCandidate } from '@/mocks/candidates';
import { Avatar } from '@/components/common/Avatar';
import { useState } from 'react';

export default function ProfilePage() {
  const candidate = mockCurrentCandidate;
  const [name, setName] = useState(candidate.name);
  const [headline, setHeadline] = useState(candidate.headline);
  const [location, setLocation] = useState(candidate.location);
  const [skills, setSkills] = useState(candidate.skills.join(', '));

  return (
    <DashboardLayout title="Profile Settings">
      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-card border border-border">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <Avatar name={name} size="xl" />
            <div>
              <h3 className="font-semibold text-text text-lg">{name}</h3>
              <p className="text-sm text-text-secondary mb-3">{headline}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Change Avatar</Button>
                <Button size="sm" variant="ghost" className="text-error">Remove</Button>
              </div>
            </div>
          </div>

          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} />
              <Input label="Headline" value={headline} onChange={e => setHeadline(e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input label="Location" value={location} onChange={e => setLocation(e.target.value)} />
              <Input label="Phone" defaultValue={candidate.phone} />
            </div>

            <Input 
              label="Skills (comma separated)" 
              value={skills} 
              onChange={e => setSkills(e.target.value)} 
              hint="e.g. React, Node.js, Python" 
            />

            <div className="grid grid-cols-2 gap-4">
              <Input label="LinkedIn URL" defaultValue={candidate.linkedinUrl} />
              <Input label="GitHub URL" defaultValue={candidate.githubUrl} />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
