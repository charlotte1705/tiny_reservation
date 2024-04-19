import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const NotificationContent = ({ notification }) => {
  return (
    <Box display="flex" alignItems="center" p={1}>
      <Avatar alt="User Avatar" src={notification.userAvatar} />
      <Box ml={1}>
        <Typography variant="body1">{notification.message}</Typography>
        <Typography variant="caption">{notification.timestamp}</Typography>
      </Box>
    </Box>
  );
};

export default NotificationContent;
