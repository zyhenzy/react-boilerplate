// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery, Theme } from '@mui/material';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import User from './pages/User/User';
import Settings from './pages/Settings';
import {Box} from "@mui/material";
import Login from "./pages/Login";
import './styles/App.scss';
import Register from "./pages/Register";
import Agent from "./pages/Agent/Agent";
import SupplierPage from './pages/Supplier/SupplierPage';
import AgentOrderPage from "./pages/AgentOrder/AgentOrderPage";

const App: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleDrawerClose = () => setMobileOpen(false);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="*"
                    element={
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                            <Navbar onMenuClick={handleDrawerToggle} />
                            <div style={{ display: 'flex', flexGrow: 1 }}>
                                <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerClose} />
                                <Box component="main" sx={{ flex: 1, width: '100%', ml: isMobile ? 0 : '0px', p: isMobile ? 1 : 3 }}>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/user" element={<User />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/agent" element={<Agent />} />
                                        <Route path="/supplier" element={<SupplierPage />} />
                                        <Route path="/agentOrder" element={<AgentOrderPage />} />
                                    </Routes>
                                </Box>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
