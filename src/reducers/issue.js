import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR,
  EDIT_ISSUE_IS_PENDING,
  EDIT_ISSUE_WAS_SUCCESSFUL,
  EDIT_ISSUE_HAD_ERROR,
  CHANGE_LOCK_STATUS_IS_PENDING,
  CHANGE_LOCK_STATUS_WAS_SUCCESSFUL,
  CHANGE_LOCK_STATUS_HAD_ERROR,
  GET_ISSUE_DIFF_IS_PENDING,
  GET_ISSUE_DIFF_WAS_SUCCESSFUL,
  GET_ISSUE_DIFF_HAD_ERROR,
  GET_ISSUE_FROM_URL_IS_PENDING,
  GET_ISSUE_FROM_URL_WAS_SUCCESSFUL,
  GET_ISSUE_FROM_URL_HAD_ERROR
} from '../constants';

const initialState = {
  issue: {},
  comments: [],
  diff: '',
  isPendingComments: false,
  isPostingComment: false,
  isEditingIssue: false,
  isChangingLockStatus: false,
  isPendingDiff: false,
  isPendingIssue: false,
  error: '',
}

export default function issueReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_ISSUE_COMMENTS_IS_PENDING:
        return {
          ...state,
          issue: action.payload,
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
      case EDIT_ISSUE_IS_PENDING:
        return {
          ...state,
          isEditingIssue: true,
        };
      case EDIT_ISSUE_WAS_SUCCESSFUL: {
        return {
          ...state,
          issue: {...state.issue, ...action.payload},
          isEditingIssue: false,
        };
      }
      case EDIT_ISSUE_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isEditingIssue: false,
        };
      case CHANGE_LOCK_STATUS_IS_PENDING:
        return {
          ...state,
          isChangingLockStatus: true,
        };
      case CHANGE_LOCK_STATUS_WAS_SUCCESSFUL: {
        return {
          ...state,
          issue: {...state.issue, locked: !state.issue.locked},
          isChangingLockStatus: false,
        };
      }
      case CHANGE_LOCK_STATUS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isChangingLockStatus: false,
        };
      case GET_ISSUE_DIFF_IS_PENDING:
        return {
          ...state,
          isPendingDiff: true,
        };
      case GET_ISSUE_DIFF_WAS_SUCCESSFUL:
        return {
          ...state,
          diff: action.payload,
          isPendingDiff: false,
        };
      case GET_ISSUE_DIFF_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingDiff: false,
        };
      case GET_ISSUE_FROM_URL_IS_PENDING:
        return {
          ...state,
          isPendingIssue: true,
        };
      case GET_ISSUE_FROM_URL_WAS_SUCCESSFUL:
        return {
          ...state,
          issue: action.payload,
          isPendingIssue: false,
        };
      case GET_ISSUE_FROM_URL_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingIssue: false,
        };
      default:
        return state;
  }
}
