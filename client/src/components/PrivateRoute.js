import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.jwtToken ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/signin" />
  );
};

export default PrivateRoute;
