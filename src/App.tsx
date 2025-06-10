// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import {Box} from "@mui/material";
import Login from "./pages/Login";
import './styles/App.scss';
import Register from "./pages/Register";  // 引入你的SCSS文件

const App: React.FC = () => {
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
                                <Box component="main">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/users" element={<Users />} />
                                        <Route path="/settings" element={<Settings />} />
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
