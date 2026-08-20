import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/components/common/Avatar';

interface DashboardTopbarProps {
  title: string;
}

export function DashboardTopbar({ title }: DashboardTopbarProps) {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="fixed top-0 right-0 left-sidebar h-topbar bg-white border-b border-border z-20 flex items-center px-6 gap-4">
      <h1 className="text-heading-4 font-semibold text-text flex-1">{title}</h1>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-card-sm border border-border bg-neutral-50 text-text-muted text-sm w-48 hover:border-neutral-300 transition-colors cursor-text">
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span>Search…</span>
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-card-sm hover:bg-neutral-100 text-text-secondary transition-colors">
        <Bell className="w-4.5 h-4.5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent border-2 border-white" />
      </button>

      {/* Avatar */}
      <Avatar name={user?.email ?? 'User'} size="sm" />
    </header>
  );
}
