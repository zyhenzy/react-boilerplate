import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getAndStoreUserInfo, loginUser} from '../api/user';
import type { LoginParams } from '../api/user/types';
import { setCookie } from '../utils/cookie';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleLogin = async () => {
        if (userName === '' || password === '') {
            setError('用户名和密码不能为空');
            return;
        }
        try {
            const params: LoginParams = {
                userName,
                password,
            };
            const res = await loginUser(params);
            // 登录成功后，将token存入cookie（使用工具方法）
            // @ts-ignore
            if (res && res.token) {
                // @ts-ignore
                setCookie('pc-token', res.token);
            }
            await getAndStoreUserInfo(dispatch);
            setError('');
            navigate('/');
        } catch (e: any) {
            setError(e?.message || '登录失败');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>{t('welcome')}</Typography>
                <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        label="用户名"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
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
                    {/*注册功能暂时不要*/}
                    {/*<Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>*/}
                    {/*    注册*/}
                    {/*</Button>*/}
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
