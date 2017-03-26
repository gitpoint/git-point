import {
  GET_USER_IS_PENDING,
  GET_USER_WAS_SUCCESSFUL,
  GET_USER_HAD_ERROR,
  GET_ORGS_IS_PENDING,
  GET_ORGS_WAS_SUCCESSFUL,
  GET_ORGS_HAD_ERROR
} from '../constants';

import { fetchUser, fetchUserOrgs } from '../api';

export const getUser = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_USER_IS_PENDING });

    fetchUser(user, accessToken)
      .then(data => {
        dispatch({
          type: GET_USER_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const getOrgs = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ORGS_IS_PENDING });

    fetchUserOrgs(user, accessToken).then(data => {
      dispatch({
        type: GET_ORGS_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ORGS_HAD_ERROR,
        payload: error,
      })
    })
  };
};
