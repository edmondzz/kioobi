import React, { useState, useRef, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Contacts as ContactsIcon,
  People as CollaboratorsIcon,
  Settings as SettingsIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import BedIcon from '@mui/icons-material/Bed';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import LogoutIcon from '@mui/icons-material/Logout';

export const Sidebar = ({ open, handleDrawerClose }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const drawerRef = useRef(null);

    const menuItems = [
      { icon: <DashboardIcon />, text: 'Dashboard' },
      { icon: <ContactsIcon />, text: 'Contacts' },
      { icon: <CollaboratorsIcon />, text: 'Collaborators' },
      { icon: <SupervisorAccountIcon />, text: 'Administration' },
      { icon: <BedIcon />, text: 'Hotel Reservation' },
      { icon: <CalendarMonthIcon />, text: 'Calendar' },
      { icon: <AdsClickIcon   />, text:'Marketing' },
      { icon: <SettingsIcon />, text: 'Settings' },
    ];

    useEffect(() => {
      const expandDrawer = () => {
        if (isCollapsed) {
          setIsCollapsed(false);
        }
      };

      const drawerEl = drawerRef.current;
      drawerEl.addEventListener('click', expandDrawer);

      return () => {
        drawerEl.removeEventListener('click', expandDrawer);
      };
    }, [isCollapsed]);

    return (
        <Drawer
        ref={drawerRef}
        variant="permanent"
        sx={{
          width: isCollapsed ? '48px' : '240px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isCollapsed ? '48px' : '240px',
            top: '64px',  
            backgroundColor: 'transparent', 
            boxShadow: 'none', 
          },
        }}
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-end',
            py: 1,
            px: 1,
          }}
        >
          {!isCollapsed && (
            <IconButton onClick={() => {
              handleDrawerClose();
              setIsCollapsed(true);
            }}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
        <Box sx={{position:'relative', marginBottom:'0px', bottom:'0px'}}>
          <ListItem button>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary="Log out" />}
          </ListItem>
        </Box>
      </Drawer>
    );
  };
