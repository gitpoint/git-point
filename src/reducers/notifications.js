import {
  GET_NOTIFICATIONS_IS_PENDING,
  GET_NOTIFICATIONS_WAS_SUCCESSFUL,
  GET_NOTIFICATIONS_HAD_ERROR
} from '../constants';

const initialState = {
  notifications: [],
  isPendingNotifications: false,
  error: '',
}

export default function userReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_NOTIFICATIONS_IS_PENDING:
        return {
          ...state,
          isPendingNotifications: true,
        };
      case GET_NOTIFICATIONS_WAS_SUCCESSFUL:
        return {
          ...state,
          notifications: action.payload,
          isPendingNotifications: false,
        };
      case GET_NOTIFICATIONS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingNotifications: false,
        };
      default:
        return state;
  }
}
