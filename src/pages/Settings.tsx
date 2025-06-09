// src/pages/Settings.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Settings: React.FC = () => {
    return (
        <Box sx={{ padding: '20px', marginTop: '64px' }}>
            <Typography variant="h4">Settings</Typography>
            <Typography variant="body1" sx={{ marginTop: '20px' }}>
                Adjust your system settings here.
            </Typography>
        </Box>
    );
};

export default Settings;
