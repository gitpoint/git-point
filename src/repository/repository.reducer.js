import {
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_COMMITS,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
  GET_COMMIT,
  GET_COMMIT_DIFF,
} from './repository.type';

export const initialState = {
  labels: [],
  contents: {},
  fileContent: '',
  commits: [],
  commit: {},
  diff: '',
  readMe: '',
  forked: false,
  subscribed: false,
  isPendingContents: false,
  isPendingCommits: false,
  isPendingCommit: false,
  isPendingDiff: false,
  isPendingFile: false,
  isPendingReadMe: false,
  isPendingLabels: false,
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
