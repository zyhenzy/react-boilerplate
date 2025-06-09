import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
