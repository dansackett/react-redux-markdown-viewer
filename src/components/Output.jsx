import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Output = React.createClass({
  mixins: [PureRenderMixin],
  getMarkup: function() {
    return { __html: this.props.output };
  },
  render: function() {
    return <div className="col-md-6 well well-lg" dangerouslySetInnerHTML={this.getMarkup()}>
    </div>;
  }
});

function mapStateToProps(state) {
  return { output: state.get('output') };
}

export const OutputContainer = connect(mapStateToProps)(Output);
