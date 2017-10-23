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
import { notification } from '../../data/api/notification';
import { authError } from '../../data/api/error';

describe('Notifications reducer', () => {
  it('should return the initial state', () => {
    expect(notificationsReducer(undefined, {})).toEqual(initialState);
  });

  describe('can get notifications count', () => {
    it('can set notifications count on success', () => {
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

    it('sets error from payload on error', () => {
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
  });

  describe('handles setting and fetching unread notifications', () => {
    it('sets isPendingUnread when fetching unread notifications', () => {
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

    it('sets unread notifications from payload on success', () => {
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

    it('sets error from payload on error', () => {
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
  });

  describe('handles setting and fetching participating notifications', () => {
    it('sets isPendingParticipating when fetching participating notifications', () => {
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

    it('sets participating notifications from payload on success', () => {
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

    it('sets error from payload on error', () => {
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
  });

  describe('handles setting and fetching all notifications', () => {
    it('sets isPendingAll when fetching all notifications', () => {
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

    it('sets all notifications from payload on success', () => {
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

    it('sets error from payload on error', () => {
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
  });

  describe('can mark individual notifications as read', () => {
    it('sets isPendingMarkNotificationAsRead when marking a notification as read', () => {
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

    it('can filter out a single unread notification and update count given a notification id', () => {
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

    it('can filter out a single participating notification and update count given a notification id', () => {
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

    it("can mark a single notification in 'all' as read and update count given a notification id", () => {
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

    it('sets error from payload on error', () => {
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
  });

  describe('can mark all notifications as read', () => {
    it('sets isPendingMarkAllNotificationsAsRead when marking all notifications as read', () => {
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

    it('can mark all notifications as read', () => {
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

    it('sets error from payload on error', () => {
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
  });

  describe('can mark individual repo notifications as read', () => {
    it('sets isPendingMarkNotificationAsRead when marking a repo as read', () => {
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

    it('can filter out a single repo notification in unread notifications and update count given a repo name', () => {
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

    it('can filter out a single repo notification in participating notifications and update count given a repo name', () => {
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

    it("can mark a single repo notification in 'all' as read and update count given a repo name", () => {
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

    it('sets error from payload on error', () => {
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
});
