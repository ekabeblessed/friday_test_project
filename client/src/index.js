import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>,
  document.querySelector('#root')
);
