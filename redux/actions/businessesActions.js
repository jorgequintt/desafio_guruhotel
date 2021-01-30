import { SELECT_BUSINESS } from '../types';

// Will dispatch to "search" and "businesses" stores, but I keep the action
// in businessesActions.js since I feel is more related to the business reducer
// than the search reducer
export const selectBusiness = (business) => (dispatch) => {
   dispatch({ type: SELECT_BUSINESS, payload: business });
};
