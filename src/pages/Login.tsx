import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username === '' || password === '') {
            setError('用户名和密码不能为空');
            return;
        }

        // 登录逻辑可以放在这里，假设用户名为 "admin" 和密码为 "123456"
        if (username === 'admin' && password === '123456') {
            setError('');
            // 这里你可以处理登录成功后的逻辑
            console.log('登录成功');
        } else {
            setError('用户名或密码错误');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                <Typography variant="h5">登录</Typography>
                <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        label="用户名"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
