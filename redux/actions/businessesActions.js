import { showError } from './uiActions';
import {
   BUSINESS_FETCHING_OFF,
   DISPLAY_BUSINESS,
   FETCHING_BUSINESS,
   EXTEND_BUSINESS_INFO,
   DESELECT_BUSINESS
} from '../types';

export const deselectBusiness = () => (dispatch) => {
   dispatch({ type: DESELECT_BUSINESS });
};

export const selectBusiness = (businessId) => (dispatch, getState) => {
   dispatch({ type: FETCHING_BUSINESS });

   const businessEntry = getState().businesses.records[businessId];

   // If business already has extended info, we don't need to fetch it
   if (businessEntry.extended) {
      dispatch({ type: DISPLAY_BUSINESS, payload: businessEntry });
   } else {
      fetch('/api/business/' + businessId, { method: 'GET' })
         .then((response) => {
            if (!response.ok) throw Error('Error fetching business information');
            else return response.json();
         })
         .then((data) => {
            if (data.errors) {
               dispatch({ type: BUSINESS_FETCHING_OFF });
               dispatch(showError(data.errors[0].message));
            } else if (data.data?.business) {
               const result = data.data.business;
               const extendedBusinessEntry = { ...businessEntry, extended: result };

               dispatch({ type: EXTEND_BUSINESS_INFO, payload: { businessId, extendedInfo: result } });
               dispatch({ type: DISPLAY_BUSINESS, payload: extendedBusinessEntry });
            } else {
               dispatch({ type: BUSINESS_FETCHING_OFF });
               dispatch(showError('An unexpected error ocurred. Please try again.'));
            }
         })
         .catch((err) => {
            dispatch({ type: BUSINESS_FETCHING_OFF });
            dispatch(showError(err.message));
         });
   }
};
