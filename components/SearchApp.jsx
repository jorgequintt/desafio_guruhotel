import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import BusinessDetails from './BusinessDetails';
import BusinessList from './BusinessList';

import PropTypes from 'prop-types';
import { Component } from 'react';

export class SearchApp extends Component {
   render() {
      const { fetchingExtendedInfo, activeBusiness } = this.props;

      return (
         <>
            {fetchingExtendedInfo || activeBusiness ? (
               <BusinessDetails />
            ) : (
               <>
                  <SearchBar />
                  <BusinessList />
               </>
            )}
         </>
      );
   }
}

SearchApp.propTypes = {
   fetchingExtendedInfo: PropTypes.bool,
   activeBusiness: PropTypes.object
};

const mapStateToProps = (state) => ({
   fetchingExtendedInfo: state.businesses.fetchingExtendedInfo,
   activeBusiness: state.businesses.activeBusiness
});

export default connect(mapStateToProps)(SearchApp);
