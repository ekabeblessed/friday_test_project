import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import ResponseMessage from '../components/ResponseMessage';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { signup } from '../actions/authActions';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { useHistory } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#222',
  },
}));

const SignupScreen = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // eslint-disable-next-line
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [email, setEmail] = useState('');
  // eslint-disable-next-line
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (auth !== null) {
      return history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    closeSnackbar();
    try {
      setLoading(true);
      // eslint-disable-next-line
      const { data } = await signup({
        name,
        email,
        password,
      });

      setName('');
      setEmail('');
      setPassword('');
      history.push('/signin');
      enqueueSnackbar('Sucessfully signed up', { variant: 'success' });
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  return (
    <Layout title="Sign up" maxWidth="sm">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography variant="h4" align="center">
          Sign up
        </Typography>
        {error && <ResponseMessage severity="error">{error}</ResponseMessage>}
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is more than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
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
            <Controller
              name="confirmPassword"
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
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Confirm Password length is more than 5'
                        : 'Confirm  Password is required'
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
                <Typography>Creating account</Typography>
              ) : (
                <Typography> Create account</Typography>
              )}
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <Link className={classes.link} to="/signin">
              Sign in
            </Link>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default SignupScreen;
