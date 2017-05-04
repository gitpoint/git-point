import {
  GET_UNREAD_NOTIFICATIONS_IS_PENDING,
  GET_UNREAD_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_UNREAD_NOTIFICATIONS_HAD_ERROR,
  GET_PARTICIPATING_NOTIFICATIONS_IS_PENDING,
  GET_PARTICIPATING_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_PARTICIPATING_NOTIFICATIONS_HAD_ERROR,
  GET_ALL_NOTIFICATIONS_IS_PENDING,
  GET_ALL_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_ALL_NOTIFICATIONS_HAD_ERROR
} from "../constants";

const initialState = {
  unread: [],
  participating: [],
  all: [],
  isPendingUnread: false,
  isPendingParticipating: false,
  isPendingAll: false,
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
    default:
      return state;
  }
}
