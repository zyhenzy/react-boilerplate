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

const Navbar: React.FC = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                  <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      App Name
                  </Typography>
                  {userInfo ? (
                    <>
                      <Typography color="inherit" sx={{ mr: 2 }}>
                        {userInfo.userName || userInfo.name || '用户'}
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
