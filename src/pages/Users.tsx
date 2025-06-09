// src/pages/Users.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Users: React.FC = () => {
    return (
        <Box sx={{ padding: '20px', marginTop: '64px' }}>
            <Typography variant="h4">Users Management</Typography>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
                Manage your users here.
            </Typography>
        </Box>
    );
};

export default Users;
