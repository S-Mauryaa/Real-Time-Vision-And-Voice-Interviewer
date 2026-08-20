import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/constants';
import { Button } from '@/components/common/Button';
import { clsx } from '@/utils';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'For Companies', href: '/#companies' },
  { label: 'For Candidates', href: '/#candidates' },
];

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 font-semibold text-text">
            <div className="w-8 h-8 rounded-card-sm bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-heading-4">{APP_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          )}

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="block text-sm text-text-secondary py-2" onClick={() => setIsOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link to={ROUTES.LOGIN} className="text-sm text-center py-2 text-text-secondary">Sign In</Link>
              <Link to={ROUTES.REGISTER}>
                <Button className="w-full" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
