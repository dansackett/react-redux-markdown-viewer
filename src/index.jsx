import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {updateState} from './action_creators';
import middleware from './middleware';
import App from './components/App';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const wrappedStore = applyMiddleware(middleware(socket))(createStore);
const store = wrappedStore(reducer);

socket.on('state', state =>
  store.dispatch(updateState(state))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
