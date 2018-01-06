import {
  GET_UNREAD_NOTIFICATIONS,
  GET_PARTICIPATING_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  MARK_REPO_AS_READ,
  GET_NOTIFICATIONS_COUNT,
  MARK_ALL_NOTIFICATIONS_AS_READ,
} from './notifications.type';

export const initialState = {
  unread: [],
  participating: [],
  all: [],
  isPendingUnread: false,
  isPendingParticipating: false,
  isPendingAll: false,
  isPendingMarkNotificationAsRead: false,
  isPendingRepoMarkAsRead: false,
  isPendingMarkAllNotificationsAsRead: false,
  error: '',
  notificationsCount: null,
};

export const notificationsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_UNREAD_NOTIFICATIONS.PENDING:
      return {
        ...state,
        isPendingUnread: true,
      };
    case GET_UNREAD_NOTIFICATIONS.SUCCESS:
      return {
        ...state,
        unread: action.payload,
        isPendingUnread: false,
      };
    case GET_UNREAD_NOTIFICATIONS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUnread: false,
      };
    case GET_PARTICIPATING_NOTIFICATIONS.PENDING:
      return {
        ...state,
        isPendingParticipating: true,
      };
    case GET_PARTICIPATING_NOTIFICATIONS.SUCCESS:
      return {
        ...state,
        participating: action.payload,
        isPendingParticipating: false,
      };
    case GET_PARTICIPATING_NOTIFICATIONS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingParticipating: false,
      };
    case GET_ALL_NOTIFICATIONS.PENDING:
      return {
        ...state,
        isPendingAll: true,
      };
    case GET_ALL_NOTIFICATIONS.SUCCESS:
      return {
        ...state,
        all: action.payload,
        isPendingAll: false,
      };
    case GET_ALL_NOTIFICATIONS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingAll: false,
      };
    case MARK_NOTIFICATION_AS_READ.PENDING:
      return {
        ...state,
        isPendingMarkNotificationAsRead: true,
      };
    case MARK_NOTIFICATION_AS_READ.SUCCESS:
      return {
        ...state,
        unread: state.unread.filter(
          notification => notification.id !== action.notificationID
        ),
        participating: state.participating.filter(
          notification => notification.id !== action.notificationID
        ),
        all: state.all.map(
          notification =>
            notification.id === action.notificationID
              ? { ...notification, unread: false }
              : notification
        ),
        isPendingMarkNotificationAsRead: false,
        notificationsCount:
          state.notificationsCount && state.notificationsCount - 1,
      };
    case MARK_NOTIFICATION_AS_READ.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingMarkNotificationAsRead: false,
      };
    case MARK_REPO_AS_READ.PENDING:
      return {
        ...state,
        isPendingRepoMarkAsRead: true,
      };
    case MARK_REPO_AS_READ.SUCCESS:
      return {
        ...state,
        unread: state.unread.filter(
          notification =>
            notification.repository.full_name !== action.repoFullName
        ),
        participating: state.participating.filter(
          notification =>
            notification.repository.full_name !== action.repoFullName
        ),
        all: state.all.map(
          notification =>
            notification.repository.full_name === action.repoFullName
              ? { ...notification, unread: false }
              : notification
        ),
        isPendingRepoMarkAsRead: false,
        notificationsCount:
          state.notificationsCount &&
          state.notificationsCount - action.repoNotificationsCount,
      };
    case MARK_REPO_AS_READ.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingRepoMarkAsRead: false,
      };
    case GET_NOTIFICATIONS_COUNT.PENDING:
      return {
        ...state,
      };
    case GET_NOTIFICATIONS_COUNT.SUCCESS:
      return {
        ...state,
        notificationsCount: action.payload,
      };
    case GET_NOTIFICATIONS_COUNT.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case MARK_ALL_NOTIFICATIONS_AS_READ.PENDING:
      return {
        ...state,
        isPendingMarkAllNotificationsAsRead: true,
      };
    case MARK_ALL_NOTIFICATIONS_AS_READ.SUCCESS:
      return {
        ...state,
        isPendingMarkAllNotificationsAsRead: false,
      };
    case MARK_ALL_NOTIFICATIONS_AS_READ.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingMarkAllNotificationsAsRead: false,
      };
    default:
      return state;
  }
};
