import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/user';
import type { LoginParams } from '../api/user/data';

const Login: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (phoneNumber === '' || password === '') {
            setError('手机号和密码不能为空');
            return;
        }
        try {
            const params: LoginParams = {
                phoneNumber,
                password,
            };
            await loginUser(params);
            setError('');
            navigate('/');
        } catch (e: any) {
            setError(e?.message || '登录失败');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                <Typography variant="h5">登录</Typography>
                <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        label="手机号"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        label="密码"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                        登录
                    </Button>
                    <Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
                        注册
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

