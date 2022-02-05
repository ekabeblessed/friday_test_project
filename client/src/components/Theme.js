import { createTheme } from '@mui/material/styles';

export default createTheme({
  typography: {
    h1: {
      fontFamily: 'Roboto',
      textTransform: 'none',
      fontWeight: '800',
      lineHeight: 1.5,
      fontSize: '1.7rem',
    },

    h2: {
      fontFamily: 'Roboto',
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1.5rem',
      textDecoration: 'none',
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },

    h5: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '1.7rem',
      color: '#333',
      lineHeight: 1.1,
    },
    h6: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '1rem',
      color: '#333',
      lineHeight: 1,
    },
  },
});
