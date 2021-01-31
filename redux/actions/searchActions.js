import {
   FETCHING_RESULTS,
   STORE_SEARCH_QUERY,
   DISPLAY_ERROR,
   SEARCH_FETCHING_OFF,
   DISPLAY_RESULTS,
   STORE_BUSINESSES
} from '../types';

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
            dispatch({ type: DISPLAY_ERROR, payload: data.errors[0].message });
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
            dispatch({ type: DISPLAY_ERROR, payload: 'An unexpected error ocurred. Please try again.' });
         }
      })
      .catch((err) => {
         dispatch({ type: SEARCH_FETCHING_OFF });
         dispatch({ type: DISPLAY_ERROR, payload: err });
      });
};
