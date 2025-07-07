import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import RequestOrderPage from "./pages/RequestOrder/RequestOrderPage";
import TicketOrderPage from "./pages/TicketOrder/TicketOrderPage";
import Customer from "./pages/Customer/Customer";
import About from './pages/About';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const App: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<AlertColor>('info');

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleDrawerClose = () => setMobileOpen(false);

    // 全局方法
    React.useEffect(() => {
        window.showSnackbar = (message: string, severity: AlertColor = 'info') => {
            setSnackbarMessage(message);
            setSnackbarSeverity(severity);
            setSnackbarOpen(true);
        };
        return () => {
            window.showSnackbar = undefined;
        };
    }, []);

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="*"
                        element={
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                                <Navbar onMenuClick={handleDrawerToggle} />
                                <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
                                    <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerClose} />
                                    <Box component="main" sx={{ flex: 1, width: '100%',overflow:'scroll', ml: isMobile ? 0 : '0px', p: isMobile ? 1 : 3 }}>
                                        <Routes>
                                            <Route path="/" element={<Navigate to="/customer" replace />} />
                                            <Route path="/user" element={<User />} />
                                            <Route path="/settings" element={<Settings />} />
                                            <Route path="/agent" element={<Agent />} />
                                            <Route path="/customer" element={<Customer />} />
                                            <Route path="/supplier" element={<SupplierPage />} />
                                            <Route path="/agentOrder" element={<AgentOrderPage />} />
                                            <Route path="/requestOrder" element={<RequestOrderPage />} />
                                            <Route path="/ticketOrder" element={<TicketOrderPage />} />
                                            <Route path="/about" element={<About />} />
                                        </Routes>
                                    </Box>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </Router>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default App;
