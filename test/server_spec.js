import {Map} from 'immutable';
import {expect} from 'chai';
import {initialize, convert, reducer} from '../server'

describe('server', () => {
  describe('core', () => {
    it ('initialize returns initial state', () => {
      const initialState = initialize();

      expect(initialState).to.equal(Map({
        input: '',
        output: ''
      }));
    });

    it ('can convert to markdown', () => {
      const initialState = initialize();
      const nextState = convert(initialState, '# Hello, World!')
      const outputStr = '<h1 id=\"user-content-hello-world\" class=\"deep-link\"><a href=\"#hello-world\">Hello, World!</a></h1>\n';

      expect(nextState).to.equal(Map({
        input: '# Hello, World!',
        output: outputStr
      }));
    });
  });

  // --------------------------------------------------------------------------

  describe('reducer', () => {
    it('can initialize the application', () => {
      const action = { type: 'INITIALIZE' };
      const state = reducer(undefined, action);

      expect(state).to.equal(Map({
        input: '',
        output: ''
      }));
    });

    it('can convert to markdown', () => {
      const initialState = initialize();
      const action = { type: 'CONVERT', input: '**I am bold**' };
      const state = reducer(initialState, action);

      expect(state).to.equal(Map({
        input: '**I am bold**',
        output: '<p><strong>I am bold</strong></p>\n'
      }));
    });

    it('can reduce multiple actions', () => {
      const actions = [
        { type: 'INITIALIZE' },
        { type: 'CONVERT', input: '**I am bold**' }
      ];
      const finalState = actions.reduce(reducer, undefined);

      expect(finalState).to.equal(Map({
        input: '**I am bold**',
        output: '<p><strong>I am bold</strong></p>\n'
      }));
    });
  });
});
