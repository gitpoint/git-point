import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR
} from '../constants';

const initialState = {
  comments: [],
  isPendingComments: false,
  error: '',
}

export default function issueReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_ISSUE_COMMENTS_IS_PENDING:
        return {
          ...state,
          isPendingIssue: true,
        };
      case GET_ISSUE_COMMENTS_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: action.payload,
          isPendingIssue: false,
        };
      case GET_ISSUE_COMMENTS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingIssue: false,
        };
      default:
        return state;
  }
}
