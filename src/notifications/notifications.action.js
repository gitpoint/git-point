import {
  GET_UNREAD_NOTIFICATIONS,
  GET_PARTICIPATING_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  MARK_REPO_AS_READ
} from "./notifications.type";

import { fetchNotifications, fetchMarkNotificationAsRead, fetchMarkRepoNotificationAsRead } from 'api';

export const getUnreadNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_UNREAD_NOTIFICATIONS.PENDING });

    fetchNotifications(false, false, accessToken)
      .then(data => {
        dispatch({
          type: GET_UNREAD_NOTIFICATIONS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_UNREAD_NOTIFICATIONS.ERROR,
          payload: error,
        })
      })
  };
};

export const getParticipatingNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_PARTICIPATING_NOTIFICATIONS.PENDING });

    fetchNotifications(true, false, accessToken)
      .then(data => {
        dispatch({
          type: GET_PARTICIPATING_NOTIFICATIONS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_PARTICIPATING_NOTIFICATIONS.ERROR,
          payload: error,
        })
      })
  };
};

export const getAllNotifications = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ALL_NOTIFICATIONS.PENDING });

    fetchNotifications(false, true, accessToken)
      .then(data => {
        dispatch({
          type: GET_ALL_NOTIFICATIONS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ALL_NOTIFICATIONS.ERROR,
          payload: error,
        })
      })
  };
};

export const markAsRead = (notificationID) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MARK_NOTIFICATION_AS_READ.PENDING });

    fetchMarkNotificationAsRead(notificationID, accessToken)
      .then(() => {
        dispatch({
          type: MARK_NOTIFICATION_AS_READ.SUCCESS,
          notificationID
        });
      })
      .catch(error => {
        dispatch({
          type: MARK_NOTIFICATION_AS_READ.ERROR,
          payload: error,
        })
      })
  };
};

export const markRepoAsRead = (repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MARK_REPO_AS_READ.PENDING });

    fetchMarkRepoNotificationAsRead(repoFullName, accessToken)
      .then(() => {
        dispatch({
          type: MARK_REPO_AS_READ.SUCCESS,
          repoFullName
        });
      })
      .catch(error => {
        dispatch({
          type: MARK_REPO_AS_READ.ERROR,
          payload: error,
        })
      })
  };
};