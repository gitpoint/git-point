import { createActionSet } from 'utils';

export const GET_REPOSITORY = createActionSet('GET_REPOSITORY');
export const GET_REPOSITORY_CONTRIBUTORS = createActionSet(
  'GET_REPOSITORY_CONTRIBUTORS'
);
export const GET_REPOSITORY_CONTENTS = createActionSet(
  'GET_REPOSITORY_CONTENTS'
);
export const GET_REPOSITORY_FILE = createActionSet('GET_REPOSITORY_FILE');
export const GET_REPOSITORY_README = createActionSet('GET_REPOSITORY_README');
export const GET_REPOSITORY_LABELS = createActionSet('GET_REPOSITORY_LABELS');
export const SEARCH_OPEN_ISSUES = createActionSet('SEARCH_OPEN_ISSUES');
export const SEARCH_CLOSED_ISSUES = createActionSet('SEARCH_CLOSED_ISSUES');
export const SEARCH_OPEN_PULLS = createActionSet('SEARCH_OPEN_PULLS');
export const SEARCH_CLOSED_PULLS = createActionSet('SEARCH_CLOSED_PULLS');
