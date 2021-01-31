import {
   DISPLAY_RESULTS,
   STORE_SEARCH_QUERY,
   WIPE_SEARCH,
   FETCHING_RESULTS,
   SEARCH_FETCHING_OFF,
   DISPLAY_BUSINESS
} from '../types';

const initialState = {
   term: '',
   location: '',
   results: null,
   searhQueries: [],
   fetching: false
};

export default function (state = initialState, action) {
   switch (action.type) {
      case FETCHING_RESULTS: {
         return {
            ...state,
            fetching: true,
            results: null
         };
      }

      case SEARCH_FETCHING_OFF: {
         return {
            ...state,
            fetching: false
         };
      }

      case DISPLAY_RESULTS: {
         return {
            ...state,
            fetching: false,
            results: [...action.payload]
         };
      }

      case WIPE_SEARCH: {
         return {
            ...initialState,
            searchQueries: [...state.searhQueries] // we want to wipe everything except search history
         };
      }

      case DISPLAY_BUSINESS: {
         const selectedBusinessId = action.payload.id;
         return {
            ...state,
            results: state.results.map((business) => {
               if (business.id === selectedBusinessId) {
                  return { ...business, seen: true };
               } else return business;
            })
         };
      }

      case STORE_SEARCH_QUERY: {
         return {
            ...state,
            searchQueries: [...state.searhQueries, { term: state.term, location: state.location }]
         };
      }

      default:
         break;
   }
}