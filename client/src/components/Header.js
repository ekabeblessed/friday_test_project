import * as React from 'react';

import { AppBar, Box, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Container from '@mui/material/Container';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',
    width: '100%',
  },
  tabs: {
    ...theme.typography.tab,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.removeItem('auth');
    history.push('/logout');
  };

  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            FRIDAY-TEST
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tabs indicatorColor="white">
              {auth !== null && auth.rows.is_admin === true ? (
                <Tab
                  className={classes.tabs}
                  disableRipple
                  label="All Users"
                  component={Link}
                  to="/users"
                />
              ) : undefined}

              {/* <Tab
                className={classes.tabs}
                disableRipple
                label="All Users"
                component={Link}
                to="/users"
              /> */}

              {auth !== null && (
                <Tab
                  className={classes.tabs}
                  disableRipple
                  label="Protected Screen"
                  component={Link}
                  to="/protected"
                />
              )}
              {auth === null && (
                <Tab
                  className={classes.tabs}
                  disableRipple
                  label="Sign in"
                  component={Link}
                  to="/signin"
                />
              )}

              {auth === null && (
                <Tab
                  // className={classes.tabs}
                  disableRipple
                  label="Sign up"
                  component={Link}
                  to="/signup"
                />
              )}

              {auth !== null && (
                <Tab
                  onClick={logout}
                  className={classes.tabs}
                  disableRipple
                  label="Sign out"
                  component={Link}
                  to="/logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
