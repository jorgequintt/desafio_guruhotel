import { Component } from 'react';
import { connect } from 'react-redux';
import BusinessListItem from './BusinessListItem';
import PropTypes from 'prop-types';
import LoadingBox from './Common/LoadingBox';

export class BusinessList extends Component {
   render() {
      const { results, fetching } = this.props;
      return (
         <div className="business-list">
            {fetching ? (
               <LoadingBox iconSize={4} />
            ) : results?.length === 0 ? (
               <div className="no-results-msg">
                  No results to show <i className="far fa-frown"></i>
               </div>
            ) : (
               results?.length > 0 &&
               results.map((business) => <BusinessListItem key={business.id} business={business} />)
            )}
         </div>
      );
   }
}

BusinessList.propTypes = {
   results: PropTypes.array,
   fetching: PropTypes.bool
};

const mapStateToProps = (state) => ({
   results: state.search.results,
   fetching: state.search.fetching
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(BusinessList);
