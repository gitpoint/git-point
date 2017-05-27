import { LOGIN, GET_AUTH_USER, GET_AUTH_ORGS } from './auth.type'
import { fetchAccessToken, fetchAuthUser, fetchAuthUserOrgs } from '@api';

export const auth = (code, state) => {
  return (dispatch) => {

    dispatch({ type: LOGIN.REQUEST });

    fetchAccessToken(code, state).then(data => {
      dispatch({
        type: LOGIN.SUCCESS,
        payload: data.access_token,
      });
    })
    .catch(error => {
      dispatch({
        type: LOGIN.ERROR,
        payload: error,
      })
    })
  }
}

export const getUser = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_USER.REQUEST });

    fetchAuthUser(accessToken).then(data => {
      dispatch({
        type: GET_AUTH_USER.SUCCESS,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_AUTH_USER.ERROR,
        payload: error,
      })
    })
  };
};

export const getOrgs = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_ORGS.REQUEST });

    fetchAuthUserOrgs(accessToken).then(data => {
      dispatch({
        type: GET_AUTH_ORGS.SUCCESS,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_AUTH_ORGS.ERROR,
        payload: error,
      })
    })
  };
};