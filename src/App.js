import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Sidebar } from './components/Sidebar';

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="fixed w-full z-10">
        <Navbar />
      </div>
      <Sidebar open={sidebarOpen} handleDrawerClose={handleSidebarToggle} />
      <div className="mt-12">  {/* adjust this value based on your Navbar's height */}
        <Dashboard />
      </div>
    </div>
  );  
};
