import {
  POST_ISSUE_COMMENT,
  DELETE_ISSUE_COMMENT,
  EDIT_ISSUE_COMMENT,
  EDIT_ISSUE,
  EDIT_ISSUE_BODY,
  CHANGE_LOCK_STATUS,
  GET_ISSUE_DIFF,
  GET_ISSUE_COMMITS,
  GET_ISSUE_MERGE_STATUS,
  GET_PULL_REQUEST_FROM_URL,
  MERGE_PULL_REQUEST,
  SUBMIT_NEW_ISSUE,
} from './issue.type';

export const initialState = {
  issue: {},
  comments: [],
  pr: {},
  diff: '',
  commits: [],
  isMerged: false,
  isPostingComment: false,
  isDeletingComment: false,
  isEditingComment: false,
  isEditingIssue: false,
  isChangingLockStatus: false,
  isPendingDiff: false,
  isPendingCommits: false,
  isPendingCheckMerge: false,
  isPendingMerging: false,
  isPendingIssue: false,
  isPendingSubmitting: false,
  error: '',
};

export const issueReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_ISSUE_COMMENT.PENDING:
      return {
        ...state,
        isPostingComment: true,
      };
    case POST_ISSUE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isPostingComment: false,
      };
    case POST_ISSUE_COMMENT.ERROR:
      return {
        ...state,
        error: action.payload,
        isPostingComment: false,
      };
    case DELETE_ISSUE_COMMENT.PENDING:
      return {
        ...state,
        isDeletingComment: true,
      };
    case DELETE_ISSUE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload
        ),
        isDeletingComment: false,
      };
    case DELETE_ISSUE_COMMENT.ERROR:
      return {
        ...state,
        error: action.payload,
        isDeletingComment: false,
      };
    case EDIT_ISSUE_COMMENT.PENDING:
      return {
        ...state,
        isEditingComment: true,
      };
    case EDIT_ISSUE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: state.comments.map(
          comment =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  body: action.payload.body,
                  body_html: action.payload.body_html,
                }
              : comment
        ),
        isEditingComment: false,
      };
    case EDIT_ISSUE_COMMENT.ERROR:
      return {
        ...state,
        error: action.payload,
        isEditingComment: false,
      };
    case EDIT_ISSUE.PENDING:
      return {
        ...state,
        isEditingIssue: true,
      };
    case EDIT_ISSUE.SUCCESS: {
      return {
        ...state,
        issue: { ...state.issue, ...action.payload },
        isEditingIssue: false,
      };
    }
    case EDIT_ISSUE.ERROR:
      return {
        ...state,
        error: action.payload,
        isEditingIssue: false,
      };
    case EDIT_ISSUE_BODY.PENDING:
      return {
        ...state,
        isEditingComment: true,
      };
    case EDIT_ISSUE_BODY.SUCCESS: {
      return {
        ...state,
        issue: {
          ...state.issue,
          body: action.payload.body,
          body_html: action.payload.body_html,
        },
        isEditingComment: false,
      };
    }
    case EDIT_ISSUE_BODY.ERROR:
      return {
        ...state,
        error: action.payload,
        isEditingComment: false,
      };
    case CHANGE_LOCK_STATUS.PENDING:
      return {
        ...state,
        isChangingLockStatus: true,
      };
    case CHANGE_LOCK_STATUS.SUCCESS: {
      return {
        ...state,
        issue: { ...state.issue, locked: !state.issue.locked },
        isChangingLockStatus: false,
      };
    }
    case CHANGE_LOCK_STATUS.ERROR:
      return {
        ...state,
        error: action.payload,
        isChangingLockStatus: false,
      };
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
    case GET_ISSUE_COMMITS.PENDING:
      return {
        ...state,
        commits: [],
        isPendingCommits: true,
      };
    case GET_ISSUE_COMMITS.SUCCESS:
      return {
        ...state,
        commits: action.payload,
        isPendingCommits: false,
      };
    case GET_ISSUE_COMMITS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingCommits: false,
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
