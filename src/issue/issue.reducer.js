import {
  GET_ISSUE_DIFF,
  GET_ISSUE_MERGE_STATUS,
  GET_PULL_REQUEST_FROM_URL,
  MERGE_PULL_REQUEST,
  GET_ISSUE_FROM_URL,
  SUBMIT_NEW_ISSUE,
} from './issue.type';

const initialState = {
  issue: {},
  comments: [],
  events: [],
  pr: {},
  diff: '',
  isMerged: false,
  isPendingComments: false,
  isPendingEvents: false,
  isPostingComment: false,
  isDeletingComment: false,
  isEditingComment: false,
  isEditingIssue: false,
  isChangingLockStatus: false,
  isPendingDiff: false,
  isPendingCheckMerge: false,
  isPendingMerging: false,
  isPendingIssue: false,
  isPendingSubmitting: false,
  error: '',
};

export const issueReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ISSUE_DIFF.PENDING:
      return {
        ...state,
        isPendingDiff: true,
      };
    case GET_ISSUE_DIFF.SUCCESS:
      return {
        ...state,
        diff: action.payload,
        isPendingDiff: false,
      };
    case GET_ISSUE_DIFF.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingDiff: false,
      };
    case GET_ISSUE_MERGE_STATUS.PENDING:
      return {
        ...state,
        isPendingCheckMerge: true,
      };
    case GET_ISSUE_MERGE_STATUS.SUCCESS:
      return {
        ...state,
        isMerged: action.payload,
        isPendingCheckMerge: false,
      };
    case GET_ISSUE_MERGE_STATUS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingCheckMerge: false,
      };
    case MERGE_PULL_REQUEST.PENDING:
      return {
        ...state,
        isPendingMerging: true,
      };
    case MERGE_PULL_REQUEST.SUCCESS:
      return {
        ...state,
        isMerged: action.payload,
        isPendingMerging: false,
      };
    case MERGE_PULL_REQUEST.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingMerging: false,
      };
    case GET_PULL_REQUEST_FROM_URL.PENDING:
      return {
        ...state,
        isPendingPR: true,
      };
    case GET_PULL_REQUEST_FROM_URL.SUCCESS:
      return {
        ...state,
        pr: action.payload,
        isPendingPR: false,
      };
    case GET_PULL_REQUEST_FROM_URL.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingPR: false,
      };
    case GET_ISSUE_FROM_URL.PENDING:
      return {
        ...state,
        isPendingIssue: true,
      };
    case GET_ISSUE_FROM_URL.SUCCESS:
      return {
        ...state,
        issue: action.payload,
        isPendingIssue: false,
        pr: initialState.pr,
        diff: initialState.diff,
        isMerged: initialState.isMerged,
      };
    case GET_ISSUE_FROM_URL.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingIssue: false,
      };
    case SUBMIT_NEW_ISSUE.PENDING:
      return {
        ...state,
        isPendingSubmitting: true,
      };
    case SUBMIT_NEW_ISSUE.SUCCESS:
      return {
        ...state,
        issue: action.payload,
        isPendingSubmitting: false,
      };
    case SUBMIT_NEW_ISSUE.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSubmitting: false,
      };
    default:
      return state;
  }
};
