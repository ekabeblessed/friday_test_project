import React, { Fragment } from 'react';
import { ThemeProvider } from '@mui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import AllUsers from './screens/AllUsers';
// import UpdateUser from './screens/UpdateUser';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import InsertUsers from './screens/InsertUsers';
import SignoutScreen from './screens/SignoutScreen';
import ProtectedScreen from './screens/ProtectedScreen';

import Header from './components/Header';
import Footer from './components/Footer';
import Theme from './components/Theme';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Fragment className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/signin" component={SigninScreen} />
            {/* <Route exact path="/update/:id" component={UpdateUser} /> */}
            <Route exact path="/signup" component={SignupScreen} />
            <Route exact path="/logout" component={SignoutScreen} />
            <AdminRoute exact path="/add-user" component={InsertUsers} />
            <AdminRoute exact path="/users" component={AllUsers} />
            <PrivateRoute exact path="/protected" component={ProtectedScreen} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </Fragment>
    </ThemeProvider>
  );
};
export default App;
