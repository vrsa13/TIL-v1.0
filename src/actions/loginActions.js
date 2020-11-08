import { SIGGNED_IN, LOGIN_ERROR, SET_LOADING } from './types';

//Set user siggned in
export const siggnedIn = isSignedIn => async dispatch => {
  try {
    setLoading();
    dispatch({
      type: SIGGNED_IN,
      signed: isSignedIn,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    });
  }
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
