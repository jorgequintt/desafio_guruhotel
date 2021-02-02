import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Overlay extends Component {
   render() {
      const { errorMsg } = this.props;

      return (
         <div className="overlay">
            {errorMsg && (
               <div className="overlay-error-msg">
                  <i className="fas fa-exclamation" style={{ marginRight: '1rem' }}></i> {errorMsg}
               </div>
            )}
         </div>
      );
   }
}

Overlay.propTypes = {
   errorMsg: PropTypes.string
};

const mapStateToProps = (state) => ({
   errorMsg: state.ui.errorMsg
});

export default connect(mapStateToProps)(Overlay);
