import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation(); // 获取当前路径

    // 判断是否选中
    const getListItemStyle = (path: string) => {
        return location.pathname === path
            ? { backgroundColor: '#f4f4f4', color: '#1976d2' } // 选中项的样式
            : {}; // 未选中项的样式
    };

    return (
        <Box sx={{ width: 250,height:'100%'}}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    height:'100%',
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                        position: 'relative', // 覆盖默认的 fixed
                        height:'100%'
                    },
                }}
            >
                <List sx={{height:'100%'}}>
                    {/* 使用 getListItemStyle 函数来动态设置选中项的样式 */}
                    <ListItem component={Link} to="/" sx={getListItemStyle('/')}>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="/users" sx={getListItemStyle('/users')}>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem component={Link} to="/settings" sx={getListItemStyle('/settings')}>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
