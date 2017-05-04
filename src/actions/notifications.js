import {
  GET_NOTIFICATIONS_IS_PENDING,
  GET_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_NOTIFICATIONS_HAD_ERROR
} from '../constants';

import { fetchNotifications } from '../api';

export const getNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_NOTIFICATIONS_IS_PENDING });

    fetchNotifications(accessToken)
      .then(data => {
        dispatch({
          type: GET_NOTIFICATIONS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_NOTIFICATIONS_HAD_ERROR,
          payload: error,
        })
      })
  };
};
