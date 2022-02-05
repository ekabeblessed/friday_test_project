import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';

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
    <>
      <Helmet>
        <title>{title ? `${title} - Friday Test` : 'Friday Test'}</title>
      </Helmet>

      <Container maxWidth={maxWidth} title={title} className={classes.main}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
