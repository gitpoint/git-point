import {
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_COMMITS,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
  GET_COMMIT,
  GET_COMMIT_DIFF,
  SEARCH_OPEN_ISSUES,
  SEARCH_CLOSED_ISSUES,
  SEARCH_OPEN_PULLS,
  SEARCH_CLOSED_PULLS,
} from './repository.type';

export const initialState = {
  repository: {},
  contributors: [],
  labels: [],
  contents: {},
  fileContent: '',
  commits: [],
  commit: {},
  diff: '',
  readMe: '',
  hasRepoExist: false,
  forked: false,
  subscribed: false,
  searchedOpenIssues: [],
  searchedClosedIssues: [],
  searchedOpenPulls: [],
  searchedClosedPulls: [],
  isPendingContents: false,
  isPendingCommits: false,
  isPendingCommit: false,
  isPendingDiff: false,
  isPendingFile: false,
  isPendingReadMe: false,
  isPendingLabels: false,
  isPendingSearchOpenIssues: false,
  isPendingSearchClosedIssues: false,
  isPendingSearchOpenPulls: false,
  isPendingSearchClosedPulls: false,
  error: '',
};

export const repositoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_REPOSITORY_CONTENTS.PENDING:
      return {
        ...state,
        isPendingContents: true,
      };
    case GET_REPOSITORY_CONTENTS.SUCCESS:
      return {
        ...state,
        contents:
          action.level === 'top'
            ? { ...state.contents, top: action.results }
            : { ...state.contents, [action.level]: action.results },
        isPendingContents: false,
      };
    case GET_REPOSITORY_CONTENTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingContents: false,
      };
    case GET_REPOSITORY_FILE.PENDING:
      return {
        ...state,
        isPendingFile: true,
      };
    case GET_REPOSITORY_FILE.SUCCESS:
      return {
        ...state,
        fileContent: action.payload,
        isPendingFile: false,
      };
    case GET_REPOSITORY_FILE.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingFile: false,
      };
    case GET_REPOSITORY_COMMITS.PENDING:
      return {
        ...state,
        commits: [],
        isPendingCommits: true,
      };
    case GET_REPOSITORY_COMMITS.SUCCESS:
      return {
        ...state,
        commits: action.payload,
        isPendingCommits: false,
      };
    case GET_REPOSITORY_COMMITS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingCommits: false,
      };
    case GET_REPOSITORY_README.PENDING:
      return {
        ...state,
        isPendingReadMe: true,
      };
    case GET_REPOSITORY_README.SUCCESS:
      return {
        ...state,
        readMe: action.payload,
        isPendingReadMe: false,
      };
    case GET_REPOSITORY_README.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingReadMe: false,
      };
    case GET_REPOSITORY_LABELS.PENDING:
      return {
        ...state,
        isPendingLabels: true,
      };
    case GET_REPOSITORY_LABELS.SUCCESS:
      return {
        ...state,
        labels: action.payload,
        isPendingLabels: false,
      };
    case GET_REPOSITORY_LABELS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingLabels: false,
      };

    case SEARCH_OPEN_ISSUES.PENDING:
      return {
        ...state,
        searchedOpenIssues: [],
        isPendingSearchOpenIssues: true,
      };
    case SEARCH_OPEN_ISSUES.SUCCESS:
      return {
        ...state,
        searchedOpenIssues: action.payload,
        isPendingSearchOpenIssues: false,
      };
    case SEARCH_OPEN_ISSUES.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSearchOpenIssues: false,
      };
    case SEARCH_CLOSED_ISSUES.PENDING:
      return {
        ...state,
        searchedClosedIssues: [],
        isPendingSearchClosedIssues: true,
      };
    case SEARCH_CLOSED_ISSUES.SUCCESS:
      return {
        ...state,
        searchedClosedIssues: action.payload,
        isPendingSearchClosedIssues: false,
      };
    case SEARCH_CLOSED_ISSUES.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSearchClosedIssues: false,
      };
    case SEARCH_OPEN_PULLS.PENDING:
      return {
        ...state,
        searchedOpenPulls: [],
        isPendingSearchOpenPulls: true,
      };
    case SEARCH_OPEN_PULLS.SUCCESS:
      return {
        ...state,
        searchedOpenPulls: action.payload,
        isPendingSearchOpenPulls: false,
      };
    case SEARCH_OPEN_PULLS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSearchOpenPulls: false,
      };
    case SEARCH_CLOSED_PULLS.PENDING:
      return {
        ...state,
        searchedClosedPulls: [],
        isPendingSearchClosedPulls: true,
      };
    case SEARCH_CLOSED_PULLS.SUCCESS:
      return {
        ...state,
        searchedClosedPulls: action.payload,
        isPendingSearchClosedPulls: false,
      };
    case SEARCH_CLOSED_PULLS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingSearchClosedPulls: false,
      };
    case GET_COMMIT.PENDING:
      return {
        ...state,
        commit: {},
        isPendingCommit: true,
      };
    case GET_COMMIT.SUCCESS:
      return {
        ...state,
        commit: action.payload,
        isPendingCommit: false,
      };
    case GET_COMMIT.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingCommit: false,
      };
    case GET_COMMIT_DIFF.PENDING:
      return {
        ...state,
        isPendingDiff: true,
      };
    case GET_COMMIT_DIFF.SUCCESS:
      return {
        ...state,
        diff: action.payload,
        isPendingDiff: false,
      };
    case GET_COMMIT_DIFF.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingDiff: false,
      };
    default:
      return state;
  }
};
