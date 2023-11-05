import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Box } from '@mui/material';

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar handleSidebarToggle={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} handleDrawerClose={handleSidebarToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${sidebarOpen ? '240px' : '48px'})` } }}
      >
        <Dashboard />
      </Box>
    </Box>
  );  
};
