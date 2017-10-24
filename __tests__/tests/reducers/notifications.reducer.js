import React from 'react';
import {
  notificationsReducer,
  initialState,
} from 'notifications/notifications.reducer';
import {
  GET_UNREAD_NOTIFICATIONS,
  GET_PARTICIPATING_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  GET_NOTIFICATIONS_COUNT,
  MARK_REPO_AS_READ,
} from 'notifications/notifications.type';
import { notification } from 'testData/api/notification';
import { authError } from 'testData/api/error';

describe('Notifications Reducer', () => {
  it('should return the initial state', () => {
    expect(notificationsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set notifications count from GET_NOTIFICATIONS_COUNT.SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      notificationsCount: 1,
    };
    const getNotificationsCountSuccessAction = {
      type: GET_NOTIFICATIONS_COUNT.SUCCESS,
      payload: 1,
    };

    expect(
      notificationsReducer(initialState, getNotificationsCountSuccessAction)
    ).toEqual(expectedState);
  });

  it('should set an error from GET_NOTIFICATIONS_COUNT.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
    };
    const getNotificationsCountErrorAction = {
      type: GET_NOTIFICATIONS_COUNT.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(initialState, getNotificationsCountErrorAction)
    ).toEqual(expectedState);
  });

  /**
   * Unread notifications.
   */
  it('should set isPendingUnread to true when GET_UNREAD_NOTIFICATIONS.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingUnread: true,
    };
    const getUnreadNotificationsAction = {
      type: GET_UNREAD_NOTIFICATIONS.PENDING,
    };

    expect(
      notificationsReducer(initialState, getUnreadNotificationsAction)
    ).toEqual(expectedState);
  });

  it('should set unread notifications from GET_UNREAD_NOTIFICATIONS.SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      unread: [notification],
      isPendingUnread: false,
    };
    const getUnreadNotificationsSuccessAction = {
      type: GET_UNREAD_NOTIFICATIONS.SUCCESS,
      payload: [notification],
    };

    expect(
      notificationsReducer(initialState, getUnreadNotificationsSuccessAction)
    ).toEqual(expectedState);
  });

  it('should set an error from GET_UNREAD_NOTIFICATIONS.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingUnread: false,
    };
    const getUnreadNotificationsErrorAction = {
      type: GET_UNREAD_NOTIFICATIONS.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(initialState, getUnreadNotificationsErrorAction)
    ).toEqual(expectedState);
  });

  /**
   * Participating notifications.
   */
  it('should set isPendingParticipating to true when GET_PARTICIPATING_NOTIFICATIONS.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingParticipating: true,
    };
    const getParticipatingNotificationsAction = {
      type: GET_PARTICIPATING_NOTIFICATIONS.PENDING,
    };

    expect(
      notificationsReducer(initialState, getParticipatingNotificationsAction)
    ).toEqual(expectedState);
  });

  it('should set unread notifications from GET_PARTICIPATING_NOTIFICATIONS.SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      participating: [notification],
      isPendingParticipating: false,
    };
    const getParticipatingNotificationsSuccessAction = {
      type: GET_PARTICIPATING_NOTIFICATIONS.SUCCESS,
      payload: [notification],
    };

    expect(
      notificationsReducer(
        initialState,
        getParticipatingNotificationsSuccessAction
      )
    ).toEqual(expectedState);
  });

  it('should set an error from GET_PARTICIPATING_NOTIFICATIONS.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingParticipating: false,
    };
    const getParticipatingNotificationsErrorAction = {
      type: GET_PARTICIPATING_NOTIFICATIONS.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(
        initialState,
        getParticipatingNotificationsErrorAction
      )
    ).toEqual(expectedState);
  });

  /**
   * Fetching all notifications.
   */
  it('should set isPendingAll to true when GET_ALL_NOTIFICATIONS.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingAll: true,
    };
    const getPendingNotificationsAction = {
      type: GET_ALL_NOTIFICATIONS.PENDING,
    };

    expect(
      notificationsReducer(initialState, getPendingNotificationsAction)
    ).toEqual(expectedState);
  });

  it('should set pending notifications from GET_ALL_NOTIFICATIONS.SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      all: [notification, notification],
      isPendingAll: false,
    };
    const getPendingNotificationsSuccessAction = {
      type: GET_ALL_NOTIFICATIONS.SUCCESS,
      payload: [notification, notification],
    };

    expect(
      notificationsReducer(initialState, getPendingNotificationsSuccessAction)
    ).toEqual(expectedState);
  });

  it('should set an error from GET_ALL_NOTIFICATIONS.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingAll: false,
    };
    const getPendingNotificationsErrorAction = {
      type: GET_ALL_NOTIFICATIONS.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(initialState, getPendingNotificationsErrorAction)
    ).toEqual(expectedState);
  });

  /**
   * Mark individual notifications as read.
   */
  it('should set isPendingMarkNotificationAsRead to true when MARK_NOTIFICATION_AS_READ.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingMarkNotificationAsRead: true,
    };
    const markNotificationsReadAction = {
      type: MARK_NOTIFICATION_AS_READ.PENDING,
    };

    expect(
      notificationsReducer(initialState, markNotificationsReadAction)
    ).toEqual(expectedState);
  });

  it('should filter out the unread notification from returned notifications and update the notification count given a notification id', () => {
    const state = {
      ...initialState,
      unread: [notification],
      notificationsCount: 1,
      isPendingMarkNotificationAsRead: true,
    };

    const expectedState = {
      ...initialState,
      unread: [],
      isPendingMarkNotificationAsRead: false,
      notificationsCount: 0,
    };

    const markNotificationsReadSuccessAction = {
      type: MARK_NOTIFICATION_AS_READ.SUCCESS,
      notificationID: '1',
    };

    expect(
      notificationsReducer(state, markNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it('should filter out the participating notification from returned notifications and update the notification count given a notification id', () => {
    const state = {
      ...initialState,
      participating: [notification],
      notificationsCount: 1,
      isPendingMarkNotificationAsRead: true,
    };

    const expectedState = {
      ...initialState,
      participating: [],
      isPendingMarkNotificationAsRead: false,
      notificationsCount: 0,
    };

    const markNotificationsReadSuccessAction = {
      type: MARK_NOTIFICATION_AS_READ.SUCCESS,
      notificationID: '1',
    };

    expect(
      notificationsReducer(state, markNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it("should set the value of the unread property to false for a single notification in 'all' update the notification count given a notification id", () => {
    const state = {
      ...initialState,
      all: [notification],
      isPendingMarkNotificationAsRead: true,
      notificationsCount: 1,
    };
    const readNotification = {
      ...notification,
      unread: false,
    };
    const expectedState = {
      ...initialState,
      all: [readNotification],
      isPendingMarkNotificationAsRead: false,
      notificationsCount: 0,
    };
    const markNotificationsReadSuccessAction = {
      type: MARK_NOTIFICATION_AS_READ.SUCCESS,
      notificationID: '1',
    };

    expect(
      notificationsReducer(state, markNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it('should set an error from MARK_NOTIFICATION_AS_READ.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingMarkNotificationAsRead: false,
    };
    const markNotificationsReadErrorAction = {
      type: MARK_NOTIFICATION_AS_READ.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(initialState, markNotificationsReadErrorAction)
    ).toEqual(expectedState);
  });

  /**
   * Mark all notifications as read.
   */
  it('should set isPendingMarkAllNotificationsAsRead to true when MARK_ALL_NOTIFICATIONS_AS_READ.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingMarkAllNotificationsAsRead: true,
    };
    const markAllNotificationsReadAction = {
      type: MARK_ALL_NOTIFICATIONS_AS_READ.PENDING,
    };

    expect(
      notificationsReducer(initialState, markAllNotificationsReadAction)
    ).toEqual(expectedState);
  });

  it('should set isPendingMarkAllNotificationsAsRead to false when MARK_ALL_NOTIFICATIONS_AS_READ.SUCCESS action is dispatched', () => {
    const state = {
      ...initialState,
      isPendingMarkAllNotificationsAsRead: true,
    };
    const expectedState = {
      ...initialState,
      isPendingMarkAllNotificationsAsRead: false,
    };
    const markAllNotificationsReadSuccessAction = {
      type: MARK_ALL_NOTIFICATIONS_AS_READ.SUCCESS,
    };

    expect(
      notificationsReducer(state, markAllNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it('should set an error from MARK_ALL_NOTIFICATIONS_AS_READ.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingMarkNotificationAsRead: false,
    };
    const markAllNotificationsReadErrorAction = {
      type: MARK_ALL_NOTIFICATIONS_AS_READ.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(initialState, markAllNotificationsReadErrorAction)
    ).toEqual(expectedState);
  });

  /**
   * Mark repository notifications as read.
   */
  it('should set isPendingMarkNotificationAsRead to true when MARK_REPO_AS_READ.PENDING action is dispatched', () => {
    const expectedState = {
      ...initialState,
      isPendingRepoMarkAsRead: true,
    };
    const markRepoAsReadAction = {
      type: MARK_REPO_AS_READ.PENDING,
    };

    expect(notificationsReducer(initialState, markRepoAsReadAction)).toEqual(
      expectedState
    );
  });

  it('should filter out the repo notification from returned unread notifications and update the notification count given a repo name', () => {
    const state = {
      ...initialState,
      unread: [notification],
      notificationsCount: 1,
      isPendingRepoMarkAsRead: true,
    };

    const expectedState = {
      ...initialState,
      unread: [],
      isPendingRepoMarkAsRead: false,
      notificationsCount: 0,
    };

    const markRepoNotificationsReadSuccessAction = {
      type: MARK_REPO_AS_READ.SUCCESS,
      repoFullName: notification.repository.full_name,
      repoNotificationsCount: 1,
    };

    expect(
      notificationsReducer(state, markRepoNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it('should filter out the repo notification from returned participating notifications and update the notification count given a repo name', () => {
    const state = {
      ...initialState,
      participating: [notification],
      notificationsCount: 1,
      isPendingRepoMarkAsRead: true,
    };

    const expectedState = {
      ...initialState,
      participating: [],
      isPendingRepoMarkAsRead: false,
      notificationsCount: 0,
    };

    const markRepoNotificationsReadSuccessAction = {
      type: MARK_REPO_AS_READ.SUCCESS,
      repoFullName: notification.repository.full_name,
      repoNotificationsCount: 1,
    };

    expect(
      notificationsReducer(state, markRepoNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it("should set the value of the unread property to false for a single notification in 'all' and update the notification count given a repo name", () => {
    const state = {
      ...initialState,
      all: [notification],
      isPendingRepoMarkAsRead: true,
      notificationsCount: 1,
    };
    const readNotification = {
      ...notification,
      unread: false,
    };
    const expectedState = {
      ...initialState,
      all: [readNotification],
      isPendingRepoMarkAsRead: false,
      notificationsCount: 0,
    };
    const markRepoNotificationsReadSuccessAction = {
      type: MARK_REPO_AS_READ.SUCCESS,
      repoFullName: notification.repository.full_name,
      repoNotificationsCount: 1,
    };

    expect(
      notificationsReducer(state, markRepoNotificationsReadSuccessAction)
    ).toEqual(expectedState);
  });

  it('should set an error from the MARK_REPO_AS_READ.ERROR action', () => {
    const expectedState = {
      ...initialState,
      error: authError,
      isPendingRepoMarkAsRead: false,
    };
    const markRepoNotificationsReadErrorAction = {
      type: MARK_REPO_AS_READ.ERROR,
      payload: authError,
    };

    expect(
      notificationsReducer(initialState, markRepoNotificationsReadErrorAction)
    ).toEqual(expectedState);
  });
});
