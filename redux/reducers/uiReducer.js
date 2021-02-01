import { DISPLAY_ERROR, HIDE_ERROR } from '../types';

const initialState = {
   errorMsg: null
};

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case DISPLAY_ERROR:
         return {
            ...state,
            errorMsg: action.payload
         };

      case HIDE_ERROR: {
         return {
            ...state,
            errorMsg: null
         };
      }

      default:
         return state;
   }
}
