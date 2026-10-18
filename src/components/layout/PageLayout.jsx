import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ProjectFooter from '../branding/ProjectFooter';

export default function PageLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top Header */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 pt-16 flex-1 flex flex-col">
        <main className="flex-1 w-full p-4 lg:p-6 max-w-[1720px] mx-auto">
          {children}
        </main>

        {/* Global Footer with Watermark, Flag and Branding */}
        <ProjectFooter />
      </div>
    </div>
  );
}
