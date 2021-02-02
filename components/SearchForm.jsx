import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   fetchResults,
   updateTerm,
   updateLocation,
   addErrors,
   clearSearch
} from '../redux/actions/searchActions';
import PropTypes from 'prop-types';
import Input from './Common/Input';
import Button from './Common/Button';

export class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.validateAndFetch = this.validateAndFetch.bind(this);
      this.handleTermInputChange = this.handleTermInputChange.bind(this);
      this.handleLocationInputChange = this.handleLocationInputChange.bind(this);
      this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
   }

   validateAndFetch() {
      const errors = {};
      if (this.props.term.trim() === '') errors.term = 'You must type a search term';
      if (this.props.location.trim() === '') errors.location = 'You must type a location for this search';

      if (Object.entries(errors).length > 0)
         // early exit if there's an error
         return this.props.addErrors(errors);

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
      const { term, location, errors, fetching, results } = this.props;
      const clearEnabled = !fetching && (results || term.trim() || location.trim());

      return (
         <div className="search-form">
            <div className="inputs-wrapper">
               <Input
                  placeholder="Search term"
                  value={term}
                  error={errors.term}
                  onChange={this.handleTermInputChange}
                  onEnterKey={this.validateAndFetch}
               />
               <Input
                  placeholder="Location"
                  value={location}
                  error={errors.location}
                  onChange={this.handleLocationInputChange}
                  onEnterKey={this.validateAndFetch}
               />
            </div>
            <div className="buttons-wrapper">
               <Button
                  text="Search"
                  fontAwesomeClasses="fas fa-search"
                  disabled={fetching}
                  onClick={this.validateAndFetch}
               />
               <Button
                  text="Clear"
                  fontAwesomeClasses="fas fa-times"
                  disabled={!clearEnabled}
                  onClick={this.props.clearSearch}
               />
            </div>
         </div>
      );
   }
}

SearchBar.propTypes = {
   term: PropTypes.string,
   location: PropTypes.string,
   errors: PropTypes.object,
   fetching: PropTypes.bool,
   results: PropTypes.array,
   // actions
   updateTerm: PropTypes.func,
   updateLocation: PropTypes.func,
   fetchResults: PropTypes.func,
   addErrors: PropTypes.func,
   clearSearch: PropTypes.func
};

const mapStateToProps = (state) => ({
   term: state.search.term,
   location: state.search.location,
   results: state.search.results,
   errors: state.search.errors,
   fetching: state.search.fetching
});

const mapActionsToProps = {
   fetchResults,
   updateTerm,
   updateLocation,
   addErrors,
   clearSearch
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
