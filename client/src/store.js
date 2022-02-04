import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  authReducer,
  userReducer,
  allUsersReducer,
  // userDetailsReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
});

const middlware = [thunk];
const store = createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
