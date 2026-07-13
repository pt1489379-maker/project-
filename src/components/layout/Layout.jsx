import React from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { useApp } from '../../contexts/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const { sidebarOpen } = useApp();

  return (
    <div className="flex h-screen bg-[hsl(var(--color-bg))] overflow-hidden mesh-bg">
      <Sidebar />
      <div
        className={clsx(
          'flex flex-col flex-1 min-w-0 transition-all duration-300'
        )}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 lg:p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
