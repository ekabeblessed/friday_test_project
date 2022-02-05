import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.is_admin === true ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/protected" />
  );
};

export default AdminRoute;
