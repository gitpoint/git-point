import {
  SELECT_REPOSITORY,
  GET_REPOSITORY_IS_PENDING,
  GET_REPOSITORY_WAS_SUCCESSFUL,
  GET_REPOSITORY_HAD_ERROR,
  GET_REPOSITORY_CONTRIBUTORS_IS_PENDING,
  GET_REPOSITORY_CONTRIBUTORS_WAS_SUCCESSFUL,
  GET_REPOSITORY_CONTRIBUTORS_HAD_ERROR,
  GET_REPOSITORY_TOP_CONTENTS_IS_PENDING,
  GET_REPOSITORY_TOP_CONTENTS_WAS_SUCCESSFUL,
  GET_REPOSITORY_TOP_CONTENTS_HAD_ERROR,
  GET_REPOSITORY_ISSUES_IS_PENDING,
  GET_REPOSITORY_ISSUES_WAS_SUCCESSFUL,
  GET_REPOSITORY_ISSUES_HAD_ERROR,
  GET_REPOSITORY_README_IS_PENDING,
  GET_REPOSITORY_README_WAS_SUCCESSFUL,
  GET_REPOSITORY_README_HAD_ERROR,
} from '../constants';

const initialState = {
  repositoryName: '',
  repository: {},
  contributors: [],
  topContents: [],
  issues: [],
  readMe: '',
  isPendingRepository: false,
  isPendingContributors: false,
  isPendingTopContents: false,
  isPendingIssues: false,
  isPendingReadMe: false,
  error: '',
}

export default function repositoryReducer(state = initialState, action={}) {
  switch (action.type) {
      case SELECT_REPOSITORY:
        return {
          ...state,
          repositoryName: action.payload,
        };
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
      case GET_REPOSITORY_TOP_CONTENTS_IS_PENDING:
        return {
          ...state,
          isPendingTopContents: true,
        };
      case GET_REPOSITORY_TOP_CONTENTS_WAS_SUCCESSFUL:
        return {
          ...state,
          topContents: action.payload,
          isPendingTopContents: false,
        };
      case GET_REPOSITORY_TOP_CONTENTS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingTopContents: false,
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
      default:
        return state;
  }
}
