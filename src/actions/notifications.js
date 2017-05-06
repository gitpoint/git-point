import {
  GET_UNREAD_NOTIFICATIONS_IS_PENDING,
  GET_UNREAD_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_UNREAD_NOTIFICATIONS_HAD_ERROR,
  GET_PARTICIPATING_NOTIFICATIONS_IS_PENDING,
  GET_PARTICIPATING_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_PARTICIPATING_NOTIFICATIONS_HAD_ERROR,
  GET_ALL_NOTIFICATIONS_IS_PENDING,
  GET_ALL_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_ALL_NOTIFICATIONS_HAD_ERROR,
  MARK_AS_READ_IS_PENDING,
  MARK_AS_READ_WAS_SUCCESSFUL,
  MARK_AS_READ_HAD_ERROR,
  MARK_REPO_AS_READ_IS_PENDING,
  MARK_REPO_AS_READ_WAS_SUCCESSFUL,
  MARK_REPO_AS_READ_HAD_ERROR
} from '../constants';

import { fetchNotifications, fetchMarkNotificationAsRead, fetchMarkRepoNotificationAsRead } from '../api';

export const getUnreadNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_UNREAD_NOTIFICATIONS_IS_PENDING });

    fetchNotifications(false, false, accessToken)
      .then(data => {
        dispatch({
          type: GET_UNREAD_NOTIFICATIONS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_UNREAD_NOTIFICATIONS_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const getParticipatingNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_PARTICIPATING_NOTIFICATIONS_IS_PENDING });

    fetchNotifications(true, false, accessToken)
      .then(data => {
        dispatch({
          type: GET_PARTICIPATING_NOTIFICATIONS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_PARTICIPATING_NOTIFICATIONS_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const getAllNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ALL_NOTIFICATIONS_IS_PENDING });

    fetchNotifications(false, true, accessToken)
      .then(data => {
        dispatch({
          type: GET_ALL_NOTIFICATIONS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_NOTIFICATIONS_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const markAsRead = (notificationID) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MARK_AS_READ_IS_PENDING });

    fetchMarkNotificationAsRead(notificationID, accessToken)
      .then(() => {
        dispatch({
          type: MARK_AS_READ_WAS_SUCCESSFUL,
          notificationID: notificationID
        });
      })
      .catch(error => {
        dispatch({
          type: MARK_AS_READ_HAD_ERROR,
          payload: error,
        })
      })
  };
};

export const markRepoAsRead = (repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MARK_REPO_AS_READ_IS_PENDING });

    fetchMarkRepoNotificationAsRead(repoFullName, accessToken)
      .then(() => {
        dispatch({
          type: MARK_REPO_AS_READ_WAS_SUCCESSFUL,
          repoFullName
        });
      })
      .catch(error => {
        dispatch({
          type: MARK_REPO_AS_READ_HAD_ERROR,
          payload: error,
        })
      })
  };
};