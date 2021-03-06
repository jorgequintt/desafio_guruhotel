import { showError } from './uiActions';

import {
   FETCHING_RESULTS,
   STORE_SEARCH_QUERY,
   SEARCH_FETCHING_OFF,
   DISPLAY_RESULTS,
   STORE_BUSINESSES,
   UPDATE_TERM,
   UPDATE_LOCATION,
   ADD_SEARCH_ERRORS,
   WIPE_SEARCH
} from '../types';

export const addErrors = (errors) => (dispatch) => {
   dispatch({ type: ADD_SEARCH_ERRORS, payload: errors });
};

export const updateTerm = (term) => (dispatch) => {
   dispatch({ type: UPDATE_TERM, payload: term });
};

export const updateLocation = (location) => (dispatch) => {
   dispatch({ type: UPDATE_LOCATION, payload: location });
};

export const clearSearch = () => (dispatch) => {
   dispatch({ type: WIPE_SEARCH });
};

export const fetchResults = () => (dispatch, getState) => {
   dispatch({ type: STORE_SEARCH_QUERY });
   dispatch({ type: FETCHING_RESULTS });
   const { term, location } = getState().search;

   const queryParams = new URLSearchParams({ term, location }).toString();
   fetch('/api/search?' + queryParams, { method: 'GET' })
      .then((response) => {
         if (!response.ok) throw Error('Error fetching results');
         else return response.json();
      })
      .then((data) => {
         if (data.errors) {
            dispatch({ type: SEARCH_FETCHING_OFF });
            dispatch(showError(data.errors[0].message));
         } else if (data.data?.search?.business) {
            const results = data.data.search.business;
            const storedBusinesses = getState().businesses.records;
            const firstTimeBusiness = [];

            // We go over the results to mark the ones we've seen in other searches and
            // to store first-time-fetched business
            for (let i = 0; i < results.length; i++) {
               const business = results[i];
               if (storedBusinesses[business.id]) {
                  if (storedBusinesses[business.id].seen) results[i].seen = true;
               } else {
                  firstTimeBusiness.push(business);
               }
            }

            dispatch({ type: STORE_BUSINESSES, payload: firstTimeBusiness });
            dispatch({ type: DISPLAY_RESULTS, payload: results });
         } else {
            dispatch({ type: SEARCH_FETCHING_OFF });
            dispatch(showError('An unexpected error ocurred. Please try again.'));
         }
      })
      .catch((err) => {
         dispatch({ type: SEARCH_FETCHING_OFF });
         dispatch(showError(err.message));
      });
};
