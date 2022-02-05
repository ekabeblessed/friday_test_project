import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Snackbar,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import ResponseMessage from '../components/ResponseMessage';
import { Link } from 'react-router-dom';
import { addUser } from '../actions/authActions';
import { makeStyles } from '@mui/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#222',
  },
}));

const AddUserScreen = () => {
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [open, setOpen] = useState(false);

  const onSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage('');
    setError('');
  };

  const onSubmitHandler = async ({ name, email, password }) => {
    closeSnackbar();
    try {
      setLoading(true);
      // eslint-disable-next-line
      const res = await addUser({
        name,
        email,
        password,
      });
      setName('');
      setEmail('');
      setPassword('');
      window.location.reload();
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
    <>
      <Button
        component={Link}
        variant="outlined"
        className={classes.button}
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add New User
      </Button>

      <Dialog
        maxWidth="xs"
        style={{ zIndex: 1302 }}
        className={classes.dialogue}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle className={classes.Title}>
          <Typography
            align="center"
            justify="center"
            component="h1"
            variant="h4"
          >
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
                  style={{ marginBottom: '1rem' }}
                  id="name"
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
            ></Controller>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              {loading ? (
                <Typography>Adding New user</Typography>
              ) : (
                <Typography> Add user</Typography>
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={onSnackbarClose}
        autoHideDuration={4000}
      />
    </>
  );
};

export default AddUserScreen;
