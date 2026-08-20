import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopbar } from './DashboardTopbar';

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardTopbar title={title} />
      <main className="ml-sidebar pt-topbar">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
