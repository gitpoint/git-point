import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../constants';

import { fetchAccessToken } from '../api';

export const auth = (code, state) => {
  return (dispatch) => {

    dispatch({ type: LOGIN_REQUEST });

    fetchAccessToken(code, state).then(data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.access_token,
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      })
    })
  }
}
