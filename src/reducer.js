import {Map} from 'immutable';

function updateState(state, newState) {
  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch(action.type) {
  case 'UPDATE_STATE':
    return updateState(state, action.state);
  }
  return state;
}
