import {Map} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('client', () => {
  describe('reducer', () => {
    // Test Case: it updates the state as expected
    it('it can update the state with an UPDATE_STATE call', () => {
      const initialState = Map();
      const action = {
        type: 'UPDATE_STATE',
        state: Map({
          input: Map({
            value: 'Testing!',
            caret: 8
          }),
          output: '<p>Testing!</p>\n'
        })
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(Map({
        input: Map({
          value: 'Testing!',
          caret: 8
        }),
        output: '<p>Testing!</p>\n'
      }));
    });
  });
});
