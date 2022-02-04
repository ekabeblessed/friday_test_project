import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Dialog,
  Snackbar,
  Button,
  Divider,
  // ListItem,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import ResponseMessage from '../components/ResponseMessage';
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

const UpdateUser = ({ user }) => {
  const classes = useStyles();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

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
  };
  // eslint-disable-next-line
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [error, setError] = useState();

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // eslint-disable-next-line
      const { data } = await axios.patch(
        `http://localhost:3001/api/users/${user.id}`
      );

      console.log(data);
      enqueueSnackbar('User updated ', { variant: 'success' });
      window.redirect = '/users';
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
        EDIT USER
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
            EDIT USER
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
        <form className={classes.form} noValidate onSubmit={onUpdateHandler}>
          <DialogContent>
            <TextField
              value={name}
              variant="filled"
              fullWidth
              id="name"
              style={{ marginBottom: '1rem' }}
              className={classes.textInput}
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              style={{ marginBottom: '1rem' }}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              value={email}
              fullWidth
              id="email"
              label="Email"
            />
            {/* <ListItem>
              <FormControlLabel
                label="Is Admin"
                control={
                  <Checkbox
                    onClick={(e) => setIsAdmin(e.target.checked)}
                    checked={isAdmin}
                    name="isAdmin"
                  />
                }
              ></FormControlLabel>
            </ListItem> */}
          </DialogContent>
          <DialogActions>
            <Grid container direction="column" justify="center" align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onCreate}
                onSubmit={onUpdateHandler}
                className={classes.submit}
              >
                {isLoading ? (
                  <Typography>Updating User</Typography>
                ) : (
                  <Typography>Update User</Typography>
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
};

export default UpdateUser;
