import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useAuth } from "../../context/auth/auth";
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { Logout } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Media query to check if screen width is less than or equal to 480px
  const isScreenSmall = useMediaQuery('(max-width:480px)');

  const handleOnclick = () => {
    Logout(navigate)
  };

  // Function to toggle the sidebar when clicked
  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {isScreenSmall && ( // Conditionally render MenuIcon based on screen size
          <IconButton onClick={handleToggleSidebar}>
            <MenuIcon />
          </IconButton>
        )}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleOnclick}>
          <ExitToAppIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
