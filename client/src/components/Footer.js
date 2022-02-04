import React from 'react';
import { Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright'} {new Date().getFullYear()} Friday Challenge
    </Typography>
  );
}

const Footer = () => {
  return <Copyright />;
};

export default Footer;
