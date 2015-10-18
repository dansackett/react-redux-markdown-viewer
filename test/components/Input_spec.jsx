import React from 'react/addons';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';
import {Input} from '../../src/components/Input';
import {expect} from 'chai';
import marky from 'marky-markdown';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('Input', () => {
  // Test Case: It starts out with no input value
  it('it initially is set with a skeleton state', () => {
    const input = '';
    const output = '';
    const caret = 0;
    const component = renderIntoDocument(
      <Input input={input} caret={caret} output={output} />
    );
    const textarea = ReactDOM.findDOMNode(component.refs.input);

    expect(textarea.value).to.equal('');
  });

  // Test Case: On change, the input is updated
  it('it updates on the change event', () => {
    let input = '';
    const output = '';
    const caret = 0;
    const convert = (text) => input = text;
    const component = renderIntoDocument(
      <Input input={input} caret={caret} output={output} convert={convert} />
    );
    const textarea = ReactDOM.findDOMNode(component.refs.input);

    textarea.value = '# Hello, world!'
    Simulate.change(textarea);

    expect(textarea.value).to.equal('# Hello, world!');
    expect(input).to.equal('# Hello, world!');
  });
});
