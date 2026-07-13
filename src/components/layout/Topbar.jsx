import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useApp } from '../../contexts/AppContext';
import { Button, Avatar } from '../ui';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back, Alex 👋' },
  '/vault':     { title: 'My Vault',  subtitle: 'All your uploaded study materials' },
  '/chat':      { title: 'AI Chat',   subtitle: 'Ask anything about your notes' },
  '/quiz':      { title: 'Quizzes',   subtitle: 'Test your knowledge' },
  '/summary':   { title: 'Summaries', subtitle: 'AI-generated study summaries' },
};

export default function Topbar() {
  const { toggleSidebar } = useApp();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const page = pageTitles[location.pathname] || { title: 'MindVault AI', subtitle: '' };

  return (
    <header className="h-16 shrink-0 flex items-center px-5 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface)/0.95)] backdrop-blur-md sticky top-0 z-20">
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))] transition-all duration-150 lg:hidden shrink-0"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className="text-base font-semibold text-[hsl(var(--color-text))] leading-tight">{page.title}</h1>
          <p className="text-xs text-[hsl(var(--color-text-faint))] leading-tight">{page.subtitle}</p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4">
        <div className="relative w-full">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--color-text-faint))]">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            placeholder="Search notes, quizzes..."
            className="w-full bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-xl pl-9 pr-4 py-2 text-sm text-[hsl(var(--color-text))] placeholder:text-[hsl(var(--color-text-faint))] focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[hsl(var(--color-text-faint))] bg-[hsl(var(--color-surface-3))] border border-[hsl(var(--color-border))] rounded-md px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))] transition-all duration-150 relative"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-[hsl(var(--color-surface))]" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-2xl shadow-xl z-50 overflow-hidden animate-scale-in">
              <div className="px-4 py-3 border-b border-[hsl(var(--color-border))] flex items-center justify-between">
                <span className="text-sm font-semibold">Notifications</span>
                <span className="text-xs text-blue-400 cursor-pointer hover:underline">Mark all read</span>
              </div>
              {[
                { icon: '🎯', title: 'Quiz completed!', desc: 'You scored 87% on Cell Division', time: '2m ago', unread: true },
                { icon: '✨', title: 'Summary ready', desc: 'AI generated a summary for your biology notes', time: '1h ago', unread: true },
                { icon: '📚', title: 'File processed', desc: 'Physics Formulas Sheet is ready', time: '5h ago', unread: false },
              ].map((n, i) => (
                <div key={i} className={clsx('flex items-start gap-3 px-4 py-3 hover:bg-[hsl(var(--color-surface-2))] cursor-pointer transition-all', n.unread && 'bg-blue-500/5')}>
                  <span className="text-xl shrink-0">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[hsl(var(--color-text))]">{n.title}</p>
                    <p className="text-xs text-[hsl(var(--color-text-muted))] truncate">{n.desc}</p>
                  </div>
                  <span className="text-xs text-[hsl(var(--color-text-faint))] shrink-0 mt-0.5">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </header>
  );
}
