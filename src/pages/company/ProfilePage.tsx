import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { mockCurrentCompany } from '@/mocks/companies';
import { Avatar } from '@/components/common/Avatar';
import { useState } from 'react';

export default function ProfilePage() {
  const company = mockCurrentCompany;
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [industry, setIndustry] = useState(company.industry);
  const [website, setWebsite] = useState(company.website || '');

  return (
    <DashboardLayout title="Company Settings">
      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-card border border-border">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <Avatar name={name} size="xl" />
            <div>
              <h3 className="font-semibold text-text text-lg">{name}</h3>
              <p className="text-sm text-text-secondary mb-3">{industry}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Update Logo</Button>
                <Button size="sm" variant="ghost" className="text-error">Remove</Button>
              </div>
            </div>
          </div>

          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Company Name" value={name} onChange={e => setName(e.target.value)} />
              <Input label="Industry" value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>
            
            <Input 
              label="Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Website" value={website} onChange={e => setWebsite(e.target.value)} />
              <Input label="Company Size" defaultValue={company.size} />
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
