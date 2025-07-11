import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';
import { COUNTRY_OPTIONS } from '../constants/countryCodes';
import Autocomplete from '@mui/material/Autocomplete';
import {RegisterParams} from "../api/user/types";
import { SelectChangeEvent } from '@mui/material';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [sex, setSex] = useState<'M' | 'F' | 'O' | ''>('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryNumber, setCountryNumber] = useState('');
    const [agentId, setAgentId] = useState('');
    const [role, setRole] = useState<string[]>([]);
    const [enable] = useState(true);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !confirmPassword || !name || !phoneNumber || !countryNumber) {
            setError('所有带*字段均为必填');
            return;
        }
        if (password !== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }
        setError('');
        const params: RegisterParams = {
            userName: username,
            name,
            sex: sex || null,
            phoneNumber,
            countryNumber,
            password,
            agentId: agentId || null,
            role: role.length > 0 ? role : null,
            enable,
        };
        try {
            await registerUser(params);
            navigate('/login');
        } catch (e: any) {
            setError(e?.message || '注册失败');
        }
    };

    const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setRole(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                <Typography variant="h5">注册</Typography>
                <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        label="用户名*"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="姓名*"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="手机号*"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Autocomplete
                        options={COUNTRY_OPTIONS}
                        getOptionLabel={(option) => option.display}
                        value={COUNTRY_OPTIONS.find(option => option.code === countryNumber) || null}
                        onChange={(_, newValue) => setCountryNumber(newValue ? newValue.code : '')}
                        renderInput={(params) => (
                            <TextField {...params} label="国家号码*" margin="normal" fullWidth size="small" />
                        )}
                        size="small"
                        ListboxProps={{ style: { maxHeight: 200 } }}
                        isOptionEqualToValue={(option, value) => option.code === value.code}
                        fullWidth
                    />
                    <TextField
                        label="密码*"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="确认密码*"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="sex-label" size="small">性别</InputLabel>
                        <Select
                            labelId="sex-label"
                            value={sex}
                            label="性别"
                            size="small"
                            onChange={(e) => setSex(e.target.value as 'M' | 'F' | 'O')}
                        >
                            <MenuItem value="M">男 (Male)</MenuItem>
                            <MenuItem value="F">女 (Female)</MenuItem>
                            <MenuItem value="O">其他 (Other)</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="代理ID"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        size="small"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-label" size="small">角色</InputLabel>
                        <Select
                            labelId="role-label"
                            multiple
                            value={role}
                            label="角色"
                            size="small"
                            onChange={handleRoleChange}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            <MenuItem value="admin">管理员</MenuItem>
                            <MenuItem value="user">普通用户</MenuItem>
                            <MenuItem value="agent">代理</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
                        注册
                    </Button>
                    <Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')}>
                        返回登录
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};


export default Register;
