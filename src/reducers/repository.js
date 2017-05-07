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
  GET_REPOSITORY_LABELS_HAD_ERROR,
  SEARCH_OPEN_ISSUES_IS_PENDING,
  SEARCH_OPEN_ISSUES_WAS_SUCCESSFUL,
  SEARCH_OPEN_ISSUES_HAD_ERROR,
  SEARCH_CLOSED_ISSUES_IS_PENDING,
  SEARCH_CLOSED_ISSUES_WAS_SUCCESSFUL,
  SEARCH_CLOSED_ISSUES_HAD_ERROR,
  SEARCH_OPEN_PULLS_IS_PENDING,
  SEARCH_OPEN_PULLS_WAS_SUCCESSFUL,
  SEARCH_OPEN_PULLS_HAD_ERROR,
  SEARCH_CLOSED_PULLS_IS_PENDING,
  SEARCH_CLOSED_PULLS_WAS_SUCCESSFUL,
  SEARCH_CLOSED_PULLS_HAD_ERROR,
} from '../constants';

const initialState = {
  repository: {},
  contributors: [],
  labels: [],
  contents: [],
  issues: [],
  readMe: '',
  searchedOpenIssues: [],
  searchedClosedIssues: [],
  searchedOpenPulls: [],
  searchedClosedPulls: [],
  isPendingRepository: false,
  isPendingContributors: false,
  isPendingContents: false,
  isPendingIssues: false,
  isPendingReadMe: false,
  isPendingLabels: false,
  isPendingSearchOpenIssues: false,
  isPendingSearchClosedIssues: false,
  isPendingSearchOpenPulls: false,
  isPendingSearchClosedPulls: false,
  error: '',
}

export default function repositoryReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_REPOSITORY_IS_PENDING:
        return {
          ...state,
          issues: [],
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
      case SEARCH_OPEN_ISSUES_IS_PENDING:
        return {
          ...state,
          searchedOpenIssues: [],
          isPendingSearchOpenIssues: true,
        };
      case SEARCH_OPEN_ISSUES_WAS_SUCCESSFUL:
        return {
          ...state,
          searchedOpenIssues: action.payload,
          isPendingSearchOpenIssues: false,
        };
      case SEARCH_OPEN_ISSUES_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchOpenIssues: false,
        };
      case SEARCH_CLOSED_ISSUES_IS_PENDING:
        return {
          ...state,
          searchedClosedIssues: [],
          isPendingSearchClosedIssues: true,
        };
      case SEARCH_CLOSED_ISSUES_WAS_SUCCESSFUL:
        return {
          ...state,
          searchedClosedIssues: action.payload,
          isPendingSearchClosedIssues: false,
        };
      case SEARCH_CLOSED_ISSUES_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchClosedIssues: false,
        };
      case SEARCH_OPEN_PULLS_IS_PENDING:
        return {
          ...state,
          searchedOpenPulls: [],
          isPendingSearchOpenPulls: true,
        };
      case SEARCH_OPEN_PULLS_WAS_SUCCESSFUL:
        return {
          ...state,
          searchedOpenPulls: action.payload,
          isPendingSearchOpenPulls: false,
        };
      case SEARCH_OPEN_PULLS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchOpenPulls: false,
        };
      case SEARCH_CLOSED_PULLS_IS_PENDING:
        return {
          ...state,
          searchedClosedPulls: [],
          isPendingSearchClosedPulls: true,
        };
      case SEARCH_CLOSED_PULLS_WAS_SUCCESSFUL:
        return {
          ...state,
          searchedClosedPulls: action.payload,
          isPendingSearchClosedPulls: false,
        };
      case SEARCH_CLOSED_PULLS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingSearchClosedPulls: false,
        };
      default:
        return state;
  }
}
