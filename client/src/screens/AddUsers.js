import React, { Fragment, useState } from 'react';
import { addUser } from '../actions/authActions';

import ResponseMessage from '../components/ResponseMessage';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Dialog,
  Snackbar,
  Button,
  Divider,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  button: {
    ...theme.typography.auth,
    marginLeft: 'auto',
    '&::active': {
      color: 'none',
    },
  },

  Title: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',

    marginBottom: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',

    color: 'black',
  },

  authButton: {
    margin: '1rem',
  },
  dialogue: {
    zIndex: 1302,
  },
}));

export default function AddUsers() {
  const classes = useStyles();

  // eslint-disable-next-line
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [email, setEmail] = useState('');
  // eslint-disable-next-line
  const [password, setPassword] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
  };
  const onSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage('');
    setError('');
  };

  const onCreate = () => {
    onDialogClose();
    setSnackbarOpen(false);
  };

  const history = useHistory();
  const [error, setError] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSubmitHandler = async ({ name, email, password }) => {
    closeSnackbar();
    try {
      setIsLoading(true);
      // eslint-disable-next-line
      const res = await addUser({
        name,
        email,
        password,
      });

      if (res) {
        enqueueSnackbar('Sucessfully added user', { variant: 'success' });
        setName('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
        onDialogClose();
        window.redirect = '/';
        history.push('/users');
      }
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <Fragment>
      <Button
        component={Link}
        variant="contained"
        className={classes.button}
        color="primary"
        onClick={() => setOpen(true)}
      >
        ADD NEW USER
      </Button>

      <Dialog
        maxWidth="xs"
        style={{ zIndex: 1302 }}
        className={classes.dialogue}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle className={classes.Title}>
          <Typography align="center" justify="center" variant="h4">
            Add New User
          </Typography>
          {error && (
            <ResponseMessage
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
              severity="error"
            >
              {error}
            </ResponseMessage>
          )}
        </DialogTitle>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <DialogContent>
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
                  variant="filled"
                  fullWidth
                  id="name"
                  style={{ marginBottom: '1rem' }}
                  className={classes.textInput}
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length must be more than 1 characters!'
                        : 'Name is required!'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>{' '}
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
                  style={{ marginBottom: '1rem' }}
                  variant="filled"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Please provide a valid email.'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
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
                  variant="filled"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{
                    type: 'password',
                  }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Minimum length 8'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </DialogContent>
          <DialogActions>
            <Grid container direction="column" justify="center" align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onCreate}
                onSubmit={onSubmitHandler}
                className={classes.submit}
              >
                {isLoading ? (
                  <Typography>Adding New User</Typography>
                ) : (
                  <Typography>Add new User</Typography>
                )}
              </Button>

              <Divider />
            </Grid>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={onSnackbarClose}
        autoHideDuration={4000}
      />
    </Fragment>
  );
}
