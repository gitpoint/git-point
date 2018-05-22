import {
  fetchNotifications,
  fetchMarkNotificationAsRead,
  fetchMarkRepoNotificationAsRead,
  fetchNotificationsCount,
  fetchRepoNotificationsCount,
  fetchMarkAllNotificationsAsRead,
} from 'api';
import {
  GET_UNREAD_NOTIFICATIONS,
  GET_PARTICIPATING_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  MARK_REPO_AS_READ,
  GET_NOTIFICATIONS_COUNT,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from './notifications.type';

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
        });
      });
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
        });
      });
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
        });
      });
  };
};

export const markAsRead = notificationID => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MARK_NOTIFICATION_AS_READ.PENDING });

    fetchMarkNotificationAsRead(notificationID, accessToken)
      .then(() => {
        dispatch({
          type: MARK_NOTIFICATION_AS_READ.SUCCESS,
          notificationID,
        });
      })
      .catch(error => {
        dispatch({
          type: MARK_NOTIFICATION_AS_READ.ERROR,
          payload: error,
        });
      });
  };
};

export const markRepoAsRead = repoFullName => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;
    const [owner, repoName] = repoFullName.split('/');

    dispatch({ type: MARK_REPO_AS_READ.PENDING });

    fetchRepoNotificationsCount(owner, repoName, accessToken).then(
      repoNotificationsCount => {
        fetchMarkRepoNotificationAsRead(repoFullName, accessToken)
          .then(() => {
            dispatch({
              type: MARK_REPO_AS_READ.SUCCESS,
              repoFullName,
              repoNotificationsCount,
            });
          })
          .catch(error => {
            dispatch({
              type: MARK_REPO_AS_READ.ERROR,
              payload: error,
            });
          });
      }
    );
  };
};

export const getNotificationsCount = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_NOTIFICATIONS_COUNT.PENDING });

    fetchNotificationsCount(accessToken)
      .then(data => {
        dispatch({
          type: GET_NOTIFICATIONS_COUNT.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_NOTIFICATIONS_COUNT.ERROR,
          payload: error,
        });
      });
  };
};

export const markAllNotificationsAsRead = () => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ.PENDING });

    fetchMarkAllNotificationsAsRead(accessToken)
      .then(() => {
        dispatch({
          type: MARK_ALL_NOTIFICATIONS_AS_READ.SUCCESS,
        });
      })
      .catch(error => {
        dispatch({
          type: MARK_ALL_NOTIFICATIONS_AS_READ.ERROR,
          payload: error,
        });
      });
  };
};
