import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserInfo } from '../store/userSlice';
import { clearCookie } from '../utils/cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAndStoreUserInfo } from '../api/user';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, Theme } from '@mui/material';

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    (async () => {
      try {
        await getAndStoreUserInfo(dispatch);
      } catch (e: any) {
        if (e?.response?.status === 401) {
          navigate('/login');
        }
      }
    })();
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(clearUserInfo());
    clearCookie('token'); // 清除token
    window.location.reload();
  };

  return (
      <Box>
          <AppBar position="static">
              <Toolbar>
                  {isMobile && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                  )}
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {t('welcome')}
                  </Typography>
                  {/* 语言切换按钮（仅显示当前非激活语言） */}
                  {i18n.language === 'zh' ? (
                    <Button color="inherit" size="small" sx={{ minWidth: 0, px: 1 }} onClick={() => i18n.changeLanguage('en')}>EN</Button>
                  ) : (
                    <Button color="inherit" size="small" sx={{ minWidth: 0, px: 1 }} onClick={() => i18n.changeLanguage('zh')}>中</Button>
                  )}
                  {userInfo ? (
                    <>
                      <Typography color="inherit" sx={{ mr: 2 }}>
                        {userInfo.userName || userInfo.name}
                      </Typography>
                      <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Button color="inherit">Login</Button>
                  )}
              </Toolbar>
          </AppBar>
      </Box>
  );
};

export default Navbar;
