import {
  GET_USER_INFO_LIST_IS_PENDING,
  GET_USER_INFO_LIST_WAS_SUCCESSFUL,
  GET_USER_INFO_LIST_HAD_ERROR,
} from '../constants';

import { fetchUrl, USER_ENDPOINT } from '../api';

export const getUserInfoList = (user, type) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({
      type: GET_USER_INFO_LIST_IS_PENDING,
      user: user,
      listType: type,
    });

    fetchUrl(`${USER_ENDPOINT(user)}/${type}`, accessToken)
      .then(data => {
        dispatch({
          type: GET_USER_INFO_LIST_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER_INFO_LIST_HAD_ERROR,
          payload: error,
        })
      })
  };
};
