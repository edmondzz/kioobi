import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Hidden,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Notifications as NotificationIcon } from '@mui/icons-material';
import { Badge } from '@mui/material';
import {
  Search as SearchIcon,
  Language as LanIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import logo from '../assets/images/logo.png';
import italylogo from '../assets/images/italyflag.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearchIconClick = () => {
    setSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setSearchVisible(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <AppBar sx={{ backgroundColor: '#073461' }}>
      <Toolbar>
        <Hidden smUp>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img
          src={logo}
          alt="Logo"
          style={{ height: '40px', width: '100%', maxWidth: '150px', marginRight: '20px' }}
        />
        <Box sx={{marginLeft:'4%'}}>
        <IconButton color="inherit">
      <Badge 
        color="error"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        overlap="circular"
      >
        <NotificationIcon  
          sx={{ 
            fontSize:'1.2rem',
            border: '5px solid white',
            color: '#073461', 
            backgroundColor: 'white', 
            borderRadius: '50%', 
            height:'1.75rem', 
            width:'1.75rem', 
          }} 
        />
      </Badge>
    </IconButton>
        </Box>        
        <div style={{ flexGrow: 1 }} />
        <Hidden xsDown>
          <div ref={searchRef}>
            <Search sx={{ display: searchVisible ? 'flex' : 'none' }}>
              <SearchIconWrapper>
                <SearchIcon  sx={{height:'1.75rem', width:'1.75rem'}}  />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </div>
        </Hidden>
        {!searchVisible && (
          <IconButton color="inherit" onClick={handleSearchIconClick}>
            <SearchIcon  sx={{height:'1.75rem', width:'1.75rem'}}  />
          </IconButton>
        )}
        <Hidden smDown>
          <IconButton color="inherit">
            <LanIcon sx={{height:'1.75rem', width:'1.75rem'}}   />
          </IconButton>
          <IconButton color="inherit">
            <img
              src={italylogo}
              alt="Italy Flag"
              style={{
                borderRadius: '50%',
                height: '1.75rem',
                width: '1.75rem',
                border: '2px solid white',
              }}
            />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon  sx={{height:'1.75rem', width:'1.75rem'}}    />
          </IconButton>
        </Hidden>
        <Typography style={{ marginRight: '10px' }}>{'Kioobi User'}</Typography>
        <Avatar />
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <LanIcon />
              </ListItemIcon>
              <ListItemText primary="Language" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon  sx={{height:'1.75rem', width:'1.75rem'}}    />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
