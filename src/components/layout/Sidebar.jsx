import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useApp } from '../../contexts/AppContext';
import { Badge, Avatar, Tooltip } from '../ui';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    label: 'My Vault',
    path: '/vault',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
        <path d="M8 9h8M8 13h5"/>
      </svg>
    ),
    badge: '4',
  },
  {
    label: 'AI Chat',
    path: '/chat',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    new: true,
  },
  {
    label: 'Quizzes',
    path: '/quiz',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M9 12h6M12 9v6"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    ),
  },
  {
    label: 'Summaries',
    path: '/summary',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

const bottomNavItems = [
  {
    label: 'Settings',
    path: '/settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useApp();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-full z-30 flex flex-col',
          'bg-[hsl(var(--color-surface))] border-r border-[hsl(var(--color-border))]',
          'transition-all duration-300 ease-[var(--ease-smooth)]',
          sidebarOpen ? 'w-[240px]' : 'w-[68px]',
          'lg:relative lg:translate-x-0',
          !sidebarOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-[hsl(var(--color-border))] shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            {/* Logo mark */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-4.5 h-4.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Logo text */}
            <div className={clsx('overflow-hidden transition-all duration-300', sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0')}>
              <span className="text-base font-bold font-['Sora'] text-gradient whitespace-nowrap">MindVault</span>
              <span className="ml-1 text-xs font-semibold text-[hsl(var(--color-text-faint))] whitespace-nowrap">AI</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <Tooltip key={item.path} label={!sidebarOpen ? item.label : ''} position="right">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group w-full',
                    isActive
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={clsx('shrink-0', isActive && 'text-blue-400')}>{item.icon}</span>
                    <span
                      className={clsx(
                        'text-sm font-medium whitespace-nowrap transition-all duration-300 flex-1',
                        sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                      )}
                    >
                      {item.label}
                    </span>
                    {sidebarOpen && item.badge && (
                      <Badge variant="blue" className="ml-auto shrink-0">{item.badge}</Badge>
                    )}
                    {sidebarOpen && item.new && (
                      <Badge variant="purple" className="ml-auto shrink-0">New</Badge>
                    )}
                  </>
                )}
              </NavLink>
            </Tooltip>
          ))}

          <div className="mt-auto" />
        </nav>

        {/* Storage indicator */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center justify-between text-xs text-[hsl(var(--color-text-muted))] mb-2">
              <span>Storage used</span>
              <span className="font-medium">4.6 / 50 GB</span>
            </div>
            <div className="h-1.5 bg-[hsl(var(--color-surface-3))] rounded-full overflow-hidden">
              <div className="h-full w-[9.2%] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
            </div>
          </div>
        )}

        {/* User profile */}
        <div className="px-2 py-3 border-t border-[hsl(var(--color-border))]">
          <div className={clsx(
            'flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[hsl(var(--color-surface-2))] cursor-pointer transition-all duration-150 group'
          )}>
            <Avatar name="Alex Johnson" size="sm" />
            <div className={clsx('flex-1 min-w-0 transition-all duration-300', sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden')}>
              <p className="text-sm font-medium text-[hsl(var(--color-text))] truncate">Alex Johnson</p>
              <p className="text-xs text-[hsl(var(--color-text-faint))] truncate">Pro Plan</p>
            </div>
            {sidebarOpen && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 text-[hsl(var(--color-text-faint))] shrink-0">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className={clsx(
            'absolute -right-3 top-20 w-6 h-6 rounded-full',
            'bg-[hsl(var(--color-surface-3))] border border-[hsl(var(--color-border))]',
            'flex items-center justify-center',
            'text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))]',
            'transition-all duration-200 hover:scale-110 hidden lg:flex z-10'
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={clsx('w-3 h-3 transition-transform duration-300', sidebarOpen ? '' : 'rotate-180')}>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </aside>
    </>
  );
}
