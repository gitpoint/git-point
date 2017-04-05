import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR
} from '../constants';

const initialState = {
  comments: [],
  isPendingComments: false,
  isPostingComment: false,
  error: '',
}

export default function issueReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_ISSUE_COMMENTS_IS_PENDING:
        return {
          ...state,
          isPendingComments: true,
        };
      case GET_ISSUE_COMMENTS_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: action.payload,
          isPendingComments: false,
        };
      case GET_ISSUE_COMMENTS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingComments: false,
        };
      case POST_ISSUE_COMMENT_IS_PENDING:
        return {
          ...state,
          isPostingComment: true,
        };
      case POST_ISSUE_COMMENT_WAS_SUCCESSFUL:
        return {
          ...state,
          comments: [...state.comments, action.payload],
          isPostingComment: false,
        };
      case POST_ISSUE_COMMENT_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPostingComment: false,
        };
      default:
        return state;
  }
}
