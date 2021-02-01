import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deselectBusiness } from '../redux/actions/businessesActions';

export class BusinessDetails extends Component {
   constructor(props) {
      super(props);

      this.handleClickDeselectBusiness = this.handleClickDeselectBusiness.bind(this);
   }

   handleClickDeselectBusiness(e) {
      this.props.deselectBusiness();
   }

   render() {
      const { activeBusiness, fetchingExtendedInfo } = this.props;

      return (
         <div>
            <input type="button" value="Go Back" onClick={this.handleClickDeselectBusiness} />
            {fetchingExtendedInfo ? 'Loading...' : activeBusiness ? 'Loaded' /* Display store data */ : ''}
         </div>
      );
   }
}

BusinessDetails.propTypes = {
   activeBusiness: PropTypes.object,
   fetchingExtendedInfo: PropTypes.bool,
   // actions
   deselectBusiness: PropTypes.func
};

const mapStateToProps = (state) => ({
   activeBusiness: state.businesses.activeBusiness,
   fetchingExtendedInfo: state.businesses.fetchingExtendedInfo
});

const mapActionsToProps = {
   deselectBusiness
};

export default connect(mapStateToProps, mapActionsToProps)(BusinessDetails);