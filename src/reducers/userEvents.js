import {
  GET_USER_EVENTS_IS_PENDING,
  GET_USER_EVENTS_WAS_SUCCESSFUL,
  GET_USER_EVENTS_HAD_ERROR
} from '../constants';

const initialState = {
  userEvents: [],
  isPending: false,
  error: '',
}

export default function userReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_USER_EVENTS_IS_PENDING:
        return {
          ...state,
          isPending: true,
        };
      case GET_USER_EVENTS_WAS_SUCCESSFUL:
        return {
          ...state,
          userEvents: action.payload,
          isPending: false,
        };
      case GET_USER_EVENTS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPending: false,
        };

      default:
        return state;
  }
}
