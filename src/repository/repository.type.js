import { createActionSet } from 'utils';

export const GET_REPOSITORY = createActionSet('GET_REPOSITORY');
export const GET_REPOSITORY_CONTRIBUTORS = createActionSet(
  'GET_REPOSITORY_CONTRIBUTORS'
);
export const GET_REPOSITORY_CONTENTS = createActionSet(
  'GET_REPOSITORY_CONTENTS'
);
export const GET_REPOSITORY_FILE = createActionSet('GET_REPOSITORY_FILE');
export const GET_REPOSITORY_ISSUES = createActionSet('GET_REPOSITORY_ISSUES');
export const GET_REPO_STARRED_STATUS = createActionSet(
  'GET_REPO_STARRED_STATUS'
);
export const FORK_REPO_STATUS = createActionSet('FORK_REPO_STATUS');
export const CHANGE_STAR_STATUS = createActionSet('CHANGE_STAR_STATUS');
export const GET_REPOSITORY_README = createActionSet('GET_REPOSITORY_README');
export const GET_REPOSITORY_LABELS = createActionSet('GET_REPOSITORY_LABELS');
export const SEARCH_OPEN_ISSUES = createActionSet('SEARCH_OPEN_ISSUES');
export const SEARCH_CLOSED_ISSUES = createActionSet('SEARCH_CLOSED_ISSUES');
export const SEARCH_OPEN_PULLS = createActionSet('SEARCH_OPEN_PULLS');
export const SEARCH_CLOSED_PULLS = createActionSet('SEARCH_CLOSED_PULLS');
export const GET_REPOSITORY_SUBSCRIBED_STATUS = createActionSet(
  'GET_REPOSITORY_SUBSCRIBED_STATUS'
);
