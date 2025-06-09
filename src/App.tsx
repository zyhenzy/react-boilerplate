// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import {Box} from "@mui/material";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ display: 'flex', marginTop: '64px' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Box>
            </div>
        </Router>
    );
};

export default App;
