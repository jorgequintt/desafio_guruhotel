import { DISPLAY_ERROR, HIDE_ERROR } from '../types';

export const showError = (msg) => (dispatch) => {
   dispatch({ type: HIDE_ERROR }); // Hide any previous error msg
   dispatch({ type: DISPLAY_ERROR, payload: msg });

   setTimeout(() => {
      dispatch({ type: HIDE_ERROR });
   }, 5000);
};

export const hideError = () => (dispatch) => {
   dispatch({ type: HIDE_ERROR });
};
