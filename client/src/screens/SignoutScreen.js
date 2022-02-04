import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';

const SignoutScreen = () => {
  return (
    <Layout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h2" align="center">
            {' '}
            You have been logged out
          </Typography>
        </Grid>
        <Grid>
          <Button fillWidth variant="contained" component={Link} to="/signin">
            Login Back In
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignoutScreen;
