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
        <Box sx={{ width: 250 }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
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
