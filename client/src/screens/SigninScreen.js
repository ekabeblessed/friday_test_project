import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import ResponseMessage from '../components/ResponseMessage';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { signin } from '../actions/authActions';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#222',
  },
}));

const SigninScreen = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (auth !== null) {
      return history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      setLoading(true);
      let { data } = await signin({
        email,
        password,
      });

      // window.localStorage.setItem('auth', JSON.stringify(data.jwtToken));
      window.localStorage.setItem('auth', JSON.stringify(data.rows));
      enqueueSnackbar('Sucessfully signed in', { variant: 'success' });
      dispatch({ type: 'LOGGED_IN_USER', payload: data.rows });
      history.push('/protected');
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  return (
    <Layout title="Sign in" maxWidth="sm">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography variant="h4" align="center">
          Sign in
        </Typography>
        {error && <ResponseMessage severity="error">{error}</ResponseMessage>}
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              {loading ? (
                <Typography>signing in</Typography>
              ) : (
                <Typography> sign in</Typography>
              )}
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <Link className={classes.link} to="/signup">
              Sign up
            </Link>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default SigninScreen;
