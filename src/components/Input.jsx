import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Input = React.createClass({
  mixins: [PureRenderMixin],
  handleChange: function() {
    this.props.convert(this.refs.input.value, this.refs.input.selectionStart);
  },
  componentDidUpdate: function(prevProps, prevState) {
    // @NOTE This is a hack to keep the current position of the editor.
    // It appears that when you replace the texta in an input or textarea
    // element, it send you to the end of the field. This ensures that once
    // the component has updated, we set the caret where we would expect it to
    // go. I don't like this but it seems like a normal issue.
    this.refs.input.setSelectionRange(this.props.caret, this.props.caret);
  },
  render: function() {
    return <div className="col-md-6">
      <form>
        <textarea
          className="input-field form-control"
          rows="20"
          ref="input"
          onChange={this.handleChange}
          value={this.props.input} />
        </form>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    input: state.getIn(['input', 'value']),
    caret: state.getIn(['input', 'caret'])
  };
}

export const InputContainer = connect(mapStateToProps, actionCreators)(Input);
