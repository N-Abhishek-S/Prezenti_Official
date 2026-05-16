import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
      <main className="min-w-0 pt-16 lg:ml-65">
        <div className="mx-auto max-w-400 p-4 sm:p-6 lg:mx-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
