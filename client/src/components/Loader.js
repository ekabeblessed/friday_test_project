import React from 'react';
import {makeStyles} from '@mui/styles'
import {CircularProgress, Container, Grid} from '@mui/material'


const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block'

    }
}))  

const Loader = () => {
   const classes = useStyles()
  return <Container className={classes.root}><Grid item aling="center" justify="center">
  <CircularProgress color="primary" /></Grid> </Container>;
};

export default Loader;
