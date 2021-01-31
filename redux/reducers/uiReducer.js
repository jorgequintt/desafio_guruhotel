import { DISPLAY_ERROR, HIDE_ERROR } from '../types';

const initialState = {
   errorMsg: '',
   displayErrorMsg: false
};

export default function (state = initialState, action) {
   switch (action.type) {
      case DISPLAY_ERROR:
         return {
            ...state,
            errorMsg: action.payload,
            displayErrorMsg: true
         };

      case HIDE_ERROR: {
         return {
            ...state,
            displayErrorMsg: false
         };
      }

      default:
         break;
   }
}
