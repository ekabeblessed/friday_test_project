import { createTheme } from '@mui/material/styles';

export default createTheme({
  typography: {
    tab: {
      fontFamily: 'Roboto',
      textTransform: 'none',
      fontWeight: '800',
      fontSize: '1rem',
    },

    h2: {
      fontFamily: 'Roboto',
      fontWeight: 700,
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
      fontWeight: 700,
      fontSize: '2.5rem',

      lineHeight: 1.5,
    },

    h5: {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: '1.7rem',
      color: '#333',
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '1rem',
      color: '#333',
      lineHeight: 1.5,
    },

    subtitle1a: {
      fontSize: '1.2rem',
      fontWeight: '500',
      color: 'black',
    },
    subtitle2: {
      fontSize: '1.2rem',
      fontWeight: '400',
      color: 'rgb(46, 46, 46)',
    },
  },
});
