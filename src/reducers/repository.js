import {
  GET_REPOSITORY_IS_PENDING,
  GET_REPOSITORY_WAS_SUCCESSFUL,
  GET_REPOSITORY_HAD_ERROR,
  GET_REPOSITORY_CONTRIBUTORS_IS_PENDING,
  GET_REPOSITORY_CONTRIBUTORS_WAS_SUCCESSFUL,
  GET_REPOSITORY_CONTRIBUTORS_HAD_ERROR,
  GET_REPOSITORY_CONTENTS_IS_PENDING,
  GET_REPOSITORY_CONTENTS_WAS_SUCCESSFUL,
  GET_REPOSITORY_CONTENTS_HAD_ERROR,
  GET_REPOSITORY_ISSUES_IS_PENDING,
  GET_REPOSITORY_ISSUES_WAS_SUCCESSFUL,
  GET_REPOSITORY_ISSUES_HAD_ERROR,
  GET_REPOSITORY_README_IS_PENDING,
  GET_REPOSITORY_README_WAS_SUCCESSFUL,
  GET_REPOSITORY_README_HAD_ERROR,
  GET_REPOSITORY_LABELS_IS_PENDING,
  GET_REPOSITORY_LABELS_WAS_SUCCESSFUL,
  GET_REPOSITORY_LABELS_HAD_ERROR
} from '../constants';

const initialState = {
  repository: {},
  contributors: [],
  labels: [],
  contents: [],
  issues: [],
  readMe: '',
  isPendingRepository: false,
  isPendingContributors: false,
  isPendingContents: false,
  isPendingIssues: false,
  isPendingReadMe: false,
  isPendingLabels: false,
  error: '',
}

export default function repositoryReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_REPOSITORY_IS_PENDING:
        return {
          ...state,
          isPendingRepository: true,
        };
      case GET_REPOSITORY_WAS_SUCCESSFUL:
        return {
          ...state,
          repository: action.payload,
          isPendingRepository: false,
        };
      case GET_REPOSITORY_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingRepository: false,
        };
      case GET_REPOSITORY_CONTRIBUTORS_IS_PENDING:
        return {
          ...state,
          isPendingContributors: true,
        };
      case GET_REPOSITORY_CONTRIBUTORS_WAS_SUCCESSFUL:
        return {
          ...state,
          contributors: action.payload,
          isPendingContributors: false,
        };
      case GET_REPOSITORY_CONTRIBUTORS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingContributors: false,
        };
      case GET_REPOSITORY_CONTENTS_IS_PENDING:
        return {
          ...state,
          isPendingContents: true,
        };
      case GET_REPOSITORY_CONTENTS_WAS_SUCCESSFUL:
        return {
          ...state,
          contents: action.payload,
          isPendingContents: false,
        };
      case GET_REPOSITORY_CONTENTS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingContents: false,
        };
      case GET_REPOSITORY_ISSUES_IS_PENDING:
        return {
          ...state,
          isPendingIssues: true,
        };
      case GET_REPOSITORY_ISSUES_WAS_SUCCESSFUL:
        return {
          ...state,
          issues: action.payload,
          isPendingIssues: false,
        };
      case GET_REPOSITORY_ISSUES_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingIssues: false,
        };
      case GET_REPOSITORY_README_IS_PENDING:
        return {
          ...state,
          isPendingReadMe: true,
        };
      case GET_REPOSITORY_README_WAS_SUCCESSFUL:
        return {
          ...state,
          readMe: action.payload,
          isPendingReadMe: false,
        };
      case GET_REPOSITORY_README_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingReadMe: false,
        };
      case GET_REPOSITORY_LABELS_IS_PENDING:
        return {
          ...state,
          isPendingLabels: true,
        };
      case GET_REPOSITORY_LABELS_WAS_SUCCESSFUL:
        return {
          ...state,
          labels: action.payload,
          isPendingLabels: false,
        };
      case GET_REPOSITORY_LABELS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingLabels: false,
        };
      default:
        return state;
  }
}
