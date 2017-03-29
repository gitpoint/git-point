import {
  GET_USER_INFO_LIST_IS_PENDING,
  GET_USER_INFO_LIST_WAS_SUCCESSFUL,
  GET_USER_INFO_LIST_HAD_ERROR
} from '../constants';

const initialState = {
  user: {},
  list: [],
  isPendingList: false,
  error: '',
}

export default function userInfoListReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_USER_INFO_LIST_IS_PENDING:
        return {
          ...state,
          user: action.user,
          listType: action.listType,
          isPendingList: true,
        };
      case GET_USER_INFO_LIST_WAS_SUCCESSFUL:
        return {
          ...state,
          list: action.payload,
          isPendingList: false,
        };
      case GET_USER_INFO_LIST_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingList: false,
        };
      default:
        return state;
  }
}
