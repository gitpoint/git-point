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
} from "../constants";

const initialState = {
  unread: [],
  participating: [],
  all: [],
  isPendingUnread: false,
  isPendingParticipating: false,
  isPendingAll: false,
  isPendingMarkAsRead: false,
  isPendingRepoMarkAsRead: false,
  error: ""
};

export default function notificationsReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case GET_UNREAD_NOTIFICATIONS_IS_PENDING:
      return {
        ...state,
        isPendingUnread: true
      };
    case GET_UNREAD_NOTIFICATIONS_WAS_SUCCESSFUL:
      return {
        ...state,
        unread: action.payload,
        isPendingUnread: false
      };
    case GET_UNREAD_NOTIFICATIONS_HAD_ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUnread: false
      };
    case GET_PARTICIPATING_NOTIFICATIONS_IS_PENDING:
      return {
        ...state,
        isPendingParticipating: true
      };
    case GET_PARTICIPATING_NOTIFICATIONS_WAS_SUCCESSFUL:
      return {
        ...state,
        participating: action.payload,
        isPendingParticipating: false
      };
    case GET_PARTICIPATING_NOTIFICATIONS_HAD_ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingParticipating: false
      };
    case GET_ALL_NOTIFICATIONS_IS_PENDING:
      return {
        ...state,
        isPendingAll: true
      };
    case GET_ALL_NOTIFICATIONS_WAS_SUCCESSFUL:
      return {
        ...state,
        all: action.payload,
        isPendingAll: false
      };
    case GET_ALL_NOTIFICATIONS_HAD_ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingAll: false
      };
    case MARK_AS_READ_IS_PENDING:
      return {
        ...state,
        isPendingMarkAsRead: true
      };
    case MARK_AS_READ_WAS_SUCCESSFUL:
      return {
        ...state,
        unread: state.unread.filter(notification => notification.id !== action.notificationID),
        participating: state.participating.filter(notification => notification.id !== action.notificationID),
        all: state.all.map(
           (notification) => notification.id === action.notificationID ? {...notification, unread: false}
                                   : notification
       ),
        isPendingMarkAsRead: false
      };
    case MARK_AS_READ_HAD_ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingMarkAsRead: false
      };
    case MARK_REPO_AS_READ_IS_PENDING:
      return {
        ...state,
        isPendingRepoMarkAsRead: true
      };
    case MARK_REPO_AS_READ_WAS_SUCCESSFUL:
      return {
        ...state,
        unread: state.unread.filter(notification => notification.repository.full_name !== action.repoFullName),
        participating: state.participating.filter(notification => notification.repository.full_name !== action.repoFullName),
        all: state.all.map(
           (notification) => notification.repository.full_name === action.repoFullName ? {...notification, unread: false}
                                   : notification
       ),
        isPendingRepoMarkAsRead: false
      };
    case MARK_REPO_AS_READ_HAD_ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingRepoMarkAsRead: false
      };
    default:
      return state;
  }
}
