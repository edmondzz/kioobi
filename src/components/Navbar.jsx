import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Language as LanIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

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
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src="path_to_your_logo"
          alt="Logo"
          style={{ height: '40px', marginRight: '20px' }}
        />
        <div style={{ flexGrow: 1 }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <IconButton color="inherit">
          <LanIcon />
        </IconButton>
        <IconButton color="inherit">
          <img
            src="path_to_italy_flag"
            alt="Italy Flag"
            style={{ borderRadius: '50%', height: '24px', width: '24px' }}
          />
        </IconButton>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
        <Typography style={{ marginRight: '10px' }}>Username</Typography>
        <Avatar />
      </Toolbar>
    </AppBar>
  );
};