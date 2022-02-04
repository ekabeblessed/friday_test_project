import React, { useState } from 'react';
import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import ResponseMessage from '../components/ResponseMessage';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { addUser } from '../actions/authActions';

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

const InsertUsers = () => {
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

  const submitHandler = async ({ name, email, password }) => {
    closeSnackbar();
    try {
      setLoading(true);
      // eslint-disable-next-line
      const res = await addUser({
        name,
        email,
        password,
      });
      console.log(res);
      setName('');
      setEmail('');
      setPassword('');
      history.push('/users');
      enqueueSnackbar('User Added', { variant: 'success' });
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
    <Layout title="Add User" maxWidth="sm">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography variant="h4" align="center">
          Add User
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              {loading ? (
                <Typography>Adding user</Typography>
              ) : (
                <Typography> Add user</Typography>
              )}
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default InsertUsers;
