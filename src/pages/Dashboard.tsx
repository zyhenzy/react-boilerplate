// src/pages/Dashboard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ padding: '20px', marginTop: '64px' }}>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
                Welcome to the admin dashboard!
            </Typography>
        </Box>
    );
};

export default Dashboard;
