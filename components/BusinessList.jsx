import { Component } from 'react';
import { connect } from 'react-redux';
import BusinessListItem from './BusinessListItem';
import PropTypes from 'prop-types';

export class BusinessList extends Component {
   render() {
      const { results, fetching } = this.props;
      return (
         <div>
            {fetching
               ? 'Loading...'
               : results?.length === 0
               ? 'No results to show.'
               : results?.length > 0 &&
                 results.map((business) => <BusinessListItem key={business.id} business={business} />)}
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
