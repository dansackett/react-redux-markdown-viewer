import React from 'react';
import {InputContainer} from './Input';
import {OutputContainer} from './Output';

export default React.createClass({
  render: function() {
    return <div className="container">
      <h1>Markdown Converter <small>Using React and Redux</small></h1>
      <div className="row">
        <InputContainer></InputContainer>
        <OutputContainer></OutputContainer>
      </div>
    </div>;
  }
});
