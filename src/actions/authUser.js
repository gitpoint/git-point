import {
  GET_AUTH_USER_IS_PENDING,
  GET_AUTH_USER_WAS_SUCCESSFUL,
  GET_AUTH_USER_HAD_ERROR,
  GET_AUTH_ORGS_IS_PENDING,
  GET_AUTH_ORGS_WAS_SUCCESSFUL,
  GET_AUTH_ORGS_HAD_ERROR
} from '../constants';

import { fetchAuthUser, fetchAuthUserOrgs } from '../api';

export const getUser = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_USER_IS_PENDING });

    fetchAuthUser(accessToken).then(data => {
      dispatch({
        type: GET_AUTH_USER_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_AUTH_USER_HAD_ERROR,
        payload: error,
      })
    })
  };
};

export const getOrgs = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_AUTH_ORGS_IS_PENDING });

    fetchAuthUserOrgs(accessToken).then(data => {
      dispatch({
        type: GET_AUTH_ORGS_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_AUTH_ORGS_HAD_ERROR,
        payload: error,
      })
    })
  };
};
