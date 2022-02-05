import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/Layout';

const ProtectedScreen = () => {
  return (
    <Layout title="Protected Screen">
      <Typography variant="h4" align="center" justify="center">
        This is the protected screen
      </Typography>
    </Layout>
  );
};

export default ProtectedScreen;
