import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter, ConnectedRouter } from 'connected-react-router';

import { createStore, compose, applyMiddleware } from 'redux';
import reduxthunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AuthProvider from './Provider/AuthProvider/authProvider';
import App from './App';
import Reducers from './store/Reducer';
import './App.css';

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers(history), composeEnhancers(
  applyMiddleware(reduxthunk, routerMiddleware(history)),
));

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
