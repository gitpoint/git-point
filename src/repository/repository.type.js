import { createActionSet } from 'utils';

export const GET_REPOSITORY_CONTENTS = createActionSet(
  'GET_REPOSITORY_CONTENTS'
);
export const GET_COMMIT = createActionSet('GET_COMMIT');
export const GET_COMMIT_DIFF = createActionSet('GET_COMMIT_DIFF');
export const GET_REPOSITORY_FILE = createActionSet('GET_REPOSITORY_FILE');
export const GET_REPOSITORY_COMMITS = createActionSet('GET_REPOSITORY_COMMITS');
export const GET_REPOSITORY_README = createActionSet('GET_REPOSITORY_README');
export const GET_REPOSITORY_LABELS = createActionSet('GET_REPOSITORY_LABELS');
