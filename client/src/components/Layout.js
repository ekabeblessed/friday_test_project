import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: '2rem',
  },
}));

const Layout = ({ children, title, maxWidth }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={maxWidth} title={title} className={classes.main}>
      {children}
    </Container>
  );
};

export default Layout;
