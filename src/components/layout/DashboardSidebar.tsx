import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, History, FileText, User,
  Settings, Briefcase, Users, PlusCircle, LogOut, ChevronRight,
} from 'lucide-react';
import { APP_NAME, ROUTES } from '@/constants';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/components/common/Avatar';
import { clsx } from '@/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const candidateNav: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.CANDIDATE.DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Interviews', href: ROUTES.CANDIDATE.INTERVIEWS, icon: <Calendar className="w-4 h-4" /> },
  { label: 'Results', href: ROUTES.CANDIDATE.RESULTS, icon: <History className="w-4 h-4" /> },
  { label: 'Resume', href: ROUTES.CANDIDATE.RESUME, icon: <FileText className="w-4 h-4" /> },
  { label: 'Profile', href: ROUTES.CANDIDATE.PROFILE, icon: <User className="w-4 h-4" /> },
];

const companyNav: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.COMPANY.DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Interviews', href: ROUTES.COMPANY.INTERVIEWS, icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Create Interview', href: ROUTES.COMPANY.CREATE, icon: <PlusCircle className="w-4 h-4" /> },
  { label: 'Candidates', href: ROUTES.COMPANY.CANDIDATES, icon: <Users className="w-4 h-4" /> },
  { label: 'Results', href: ROUTES.COMPANY.RESULTS, icon: <History className="w-4 h-4" /> },
  { label: 'Profile', href: ROUTES.COMPANY.PROFILE, icon: <Settings className="w-4 h-4" /> },
];

import React from 'react';

export function DashboardSidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const isCandidate = user?.role === 'candidate';
  const navItems = isCandidate ? candidateNav : companyNav;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-sidebar flex flex-col bg-white border-r border-border z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-card-sm bg-primary flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
        <span className="font-semibold text-text">{APP_NAME}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-card-sm text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-neutral-50 hover:text-text'
              )
            }
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-card-sm hover:bg-neutral-50 transition-colors">
          <Avatar name={user?.email ?? 'User'} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-text truncate">{user?.email}</p>
            <p className="text-xs text-text-muted capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1 text-text-muted hover:text-error transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
