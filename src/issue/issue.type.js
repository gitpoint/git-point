import { createActionSet } from 'utils';

export const EDIT_ISSUE = createActionSet('EDIT_ISSUE');
export const CHANGE_LOCK_STATUS = createActionSet('CHANGE_LOCK_STATUS');
export const GET_ISSUE_DIFF = createActionSet('GET_ISSUE_DIFF');
export const GET_ISSUE_MERGE_STATUS = createActionSet('GET_ISSUE_MERGE_STATUS');
export const GET_PULL_REQUEST_FROM_URL = createActionSet(
  'GET_PULL_REQUEST_FROM_URL'
);
export const MERGE_PULL_REQUEST = createActionSet('MERGE_PULL_REQUEST');
export const GET_ISSUE_FROM_URL = createActionSet('GET_ISSUE_FROM_URL');
export const SUBMIT_NEW_ISSUE = createActionSet('SUBMIT_NEW_ISSUE');
