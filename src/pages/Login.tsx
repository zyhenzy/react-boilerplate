import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
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
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)',
        }}>
            <div style={{
                background: '#fff',
                padding: '40px 32px',
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                minWidth: 360,
                maxWidth: '90vw',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <img src={require('../assets/logo.jpg')} alt="logo" style={{ width: 48, height: 48, borderRadius: 8, marginBottom: 8 }} />
                    <Typography.Title level={3} style={{ marginBottom: 8 }}>{t('welcome')}</Typography.Title>
                    <Typography.Text type="secondary">请登录以继续使用系统</Typography.Text>
                </div>
                <Form layout="vertical" onFinish={handleLogin}>
                    {error && <Typography.Text type="danger" style={{ display: 'block', marginBottom: 12 }}>{error}</Typography.Text>}
                    <Form.Item required>
                        <Input
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="请输入用户名"
                            size="large"
                            autoFocus
                        />
                    </Form.Item>
                    <Form.Item required>
                        <Input.Password
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="请输入密码"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large" style={{ marginTop: 8 }}>
                            登录
                        </Button>
                    </Form.Item>
                    {/*注册功能暂时不要*/}
                    {/*<Button type="link" block style={{ marginTop: 8 }} onClick={() => navigate('/register')}>注册</Button>*/}
                </Form>
            </div>
        </div>
    );
};

export default Login;
