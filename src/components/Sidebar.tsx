import React from 'react';
import {Box, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, Theme} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({mobileOpen, onClose}) => {
    const location = useLocation();
    const {t} = useTranslation();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const getListItemStyle = (path: string) => {
        return location.pathname === path
            ? {backgroundColor: '#f4f4f4', color: '#1976d2'}
            : {};
    };

    const drawerContent = (
        <List sx={{height: '100%'}}>
            {/*<ListItem component={Link} to="/" sx={getListItemStyle('/')}> <ListItemText*/}
            {/*    primary={t('dashboard')}/></ListItem>*/}
            {/*<ListItem component={Link} to="/settings" sx={getListItemStyle('/settings')}><ListItemText*/}
            {/*    primary={t('settings')}/></ListItem>*/}
            <ListItem component={Link} to="/agent" sx={getListItemStyle('/agent')}><ListItemText primary={t('agent.title')}/></ListItem>
            <ListItem component={Link} to="/supplier" sx={getListItemStyle('/supplier')}><ListItemText primary={t('supplier.title')}/></ListItem>
            <ListItem component={Link} to="/user" sx={getListItemStyle('/user')}><ListItemText
                primary={t('user.title')}/></ListItem>
            <ListItem component={Link} to="/customer" sx={getListItemStyle('/customer')}><ListItemText primary={t('customer.title')}/></ListItem>
            <ListItem component={Link} to="/agentOrder" sx={getListItemStyle('/agentOrder')}><ListItemText primary={t('agentOrder.title')}/></ListItem>
            <ListItem component={Link} to="/requestOrder" sx={getListItemStyle('/requestOrder')}><ListItemText primary={t('requestOrder.title')}/></ListItem>
            <ListItem component={Link} to="/ticketOrder" sx={getListItemStyle('/ticketOrder')}><ListItemText primary={t('ticketOrder.title')}/></ListItem>
        </List>
    );

    return (
        <Box sx={{width: isMobile ? 0 : 250, height: '100%'}}>
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={onClose}
                    ModalProps={{keepMounted: true}}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 250,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {drawerContent}
                    <Divider/>
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        height: '100%',
                        '& .MuiDrawer-paper': {
                            width: 250,
                            boxSizing: 'border-box',
                            position: 'relative',
                            height: '100%'
                        },
                    }}
                    open
                >
                    {drawerContent}
                    <Divider/>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
