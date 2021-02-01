import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Overlay extends Component {
   render() {
      return <div>{this.props.errorMsg}</div>;
   }
}

Overlay.propTypes = {
   errorMsg: PropTypes.string
};

const mapStateToProps = (state) => ({
   errorMsg: state.ui.errorMsg
});

export default connect(mapStateToProps)(Overlay);
