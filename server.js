import Server from 'socket.io';
import {createStore} from 'redux';
import {Map} from 'immutable';
import marky from 'marky-markdown';

const INITIAL_STATE = Map({
  input: Map({
    value: '',
    caret: 0
  }),
  output: ''
});

// io is a reference to the socket.io server running
const io = new Server().attach(8090);

// initialize sets the initial state of the application
export function initialize() {
  return INITIAL_STATE;
}

// convert handles converting an input markdown string to its HTML couterpart
export function convert(state, input, caret) {
  return state
          .setIn(['input', 'value'], input)
          .setIn(['input', 'caret'], caret)
          .set('output', marky(input).html());
}

// reducer handles action events passed to our server running the correct
// manipuations to get a new state object
export function reducer(state, action) {
  switch (action.type) {
  case 'INITIALIZE':
    return initialize();
  case 'CONVERT':
    return convert(state, action.input, action.caret);
  }
  return state;
}

// store is the reference to our Redux store.
const store = createStore(reducer);

store.subscribe(
  () => io.emit('state', store.getState().toJS())
);

// Listen for the connection to the server
io.on('connection', (socket) => {
  socket.emit('state', store.getState().toJS());
  socket.on('action', store.dispatch.bind(store));
});

// Load the initial state of the app
store.dispatch({ type: 'INITIALIZE' });
