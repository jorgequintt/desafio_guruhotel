import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResults, updateTerm, updateLocation, addError } from '../redux/actions/searchActions';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.validateAndFetch = this.validateAndFetch.bind(this);
      this.handleTermInputChange = this.handleTermInputChange.bind(this);
      this.handleLocationInputChange = this.handleLocationInputChange.bind(this);
   }

   validateAndFetch() {
      let hasError = false;
      if (this.props.term.trim() === '') {
         this.props.addError({ term: 'You must type a search term' });
         hasError = true;
      }
      if (this.props.location.trim() === '') {
         this.props.addError({ location: 'You must type a location for this search' });
         hasError = true;
      }

      if (hasError) return;

      this.props.fetchResults();
   }

   handleTermInputChange(e) {
      this.props.updateTerm(e.target.value);
   }

   handleLocationInputChange(e) {
      this.props.updateLocation(e.target.value);
   }

   handleEnterKeyDown(e) {
      if (e.key === 'Enter') {
         this.validateAndFetch();
      }
   }

   render() {
      const { term, location, errors, fetching } = this.props;

      return (
         <div>
            <input type="text" placeholder="Term" value={term} onChange={this.handleTermInputChange} />
            {errors.term && <small>{errors.term}</small>}
            <input
               type="text"
               placeholder="Location"
               value={location}
               onChange={this.handleLocationInputChange}
               onKeyDown={this.handleEnterKeyDown}
            />
            {errors.location && <small>{errors.location}</small>}
            <input type="button" value="Search" disabled={fetching} onClick={this.validateAndFetch} />
         </div>
      );
   }
}

SearchBar.propTypes = {
   term: PropTypes.string,
   location: PropTypes.string,
   errors: PropTypes.object,
   fetching: PropTypes.bool,
   // actions
   updateTerm: PropTypes.func,
   updateLocation: PropTypes.func,
   fetchResults: PropTypes.func,
   addError: PropTypes.func
};

const mapStateToProps = (state) => ({
   term: state.search.term,
   location: state.search.location,
   errors: state.search.errors,
   fetching: state.search.fetching
});

const mapActionsToProps = {
   fetchResults,
   updateTerm,
   updateLocation,
   addError
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
