// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="*"
                    element={
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                            <Navbar />
                            <div style={{ display: 'flex', flexGrow: 1 }}>
                                <Sidebar />
                                <Box component="main" sx={{ flex: 1 }}>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/user" element={<User />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/agent" element={<Agent />} />
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
