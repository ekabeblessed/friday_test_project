import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import axios from 'axios';
import { makeStyles } from '@mui/styles';

import Layout from '../components/Layout';
import Loader from '../components/Loader';

import ResponseMessage from '../components/ResponseMessage';
import UpdateUserScreen from './UpdateUserScreen';
import AddUserScreen from './AddUserScreen';

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: '3rem',
    marginBottom: '2rem',
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: '2rem',
  },
}));

const AllUsersScreen = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const deleteUserHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      // eslint-disable-next-line
      const { data } = await axios.delete(
        `http://localhost:3001/api/users/${id}`
      );
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3001/api/users');
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout title="All Users" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Card className={classes.section}>
            <List>
              <Grid container align="center" justify="space-between">
                <Grid item>
                  <ListItem>
                    <Typography variant="h4" align="center">
                      Users List - {users.length} Users
                    </Typography>
                    {loading && <CircularProgress />}
                  </ListItem>
                </Grid>
                <Grid item>
                  <ListItem>
                    <AddUserScreen />
                  </ListItem>
                </Grid>
              </Grid>

              <ListItem>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <ResponseMessage severity="error">{error}</ResponseMessage>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>NAME</TableCell>
                          <TableCell>EMAIL</TableCell>
                          <TableCell>ROLE</TableCell>
                          <TableCell>ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users &&
                          users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                {user.isAdmin ? 'Admin' : 'User'}
                              </TableCell>
                              <TableCell>
                                <UpdateUserScreen user={user} />
                              </TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => deleteUserHandler(user.id)}
                                  size="small"
                                  variant="outlined"
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AllUsersScreen;
