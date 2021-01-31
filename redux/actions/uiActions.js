import { DISPLAY_ERROR, HIDE_ERROR } from '../types';

export const showError = (msg) => (dispatch) => {
   dispatch({ type: DISPLAY_ERROR, payload: msg });
};

export const hideError = (msg) => (dispatch) => {
   dispatch({ type: HIDE_ERROR });
};
