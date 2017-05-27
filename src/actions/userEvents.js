import {
  GET_USER_EVENTS_IS_PENDING,
  GET_USER_EVENTS_WAS_SUCCESSFUL,
  GET_USER_EVENTS_HAD_ERROR,
} from '../constants';

import { fetchUserEvents } from '@api';

export const getUserEvents = (user) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_USER_EVENTS_IS_PENDING });

      fetchUserEvents(user, accessToken).then(data => {
        dispatch({
          type: GET_USER_EVENTS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER_EVENTS_HAD_ERROR,
          payload: error,
        })
      })
  };
};
