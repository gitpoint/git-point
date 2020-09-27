import { createActionSet } from 'utils';

export const DELETE_ISSUE_COMMENT = createActionSet('DELETE_ISSUE_COMMENT');
export const EDIT_ISSUE_COMMENT = createActionSet('EDIT_ISSUE_COMMENT');
export const POST_ISSUE_COMMENT = createActionSet('POST_ISSUE_COMMENT');
export const EDIT_ISSUE = createActionSet('EDIT_ISSUE');
export const EDIT_ISSUE_BODY = createActionSet('EDIT_ISSUE_BODY');
export const CHANGE_LOCK_STATUS = createActionSet('CHANGE_LOCK_STATUS');
export const GET_ISSUE_DIFF = createActionSet('GET_ISSUE_DIFF');
export const GET_ISSUE_COMMITS = createActionSet('GET_ISSUE_COMMITS');
export const GET_ISSUE_MERGE_STATUS = createActionSet('GET_ISSUE_MERGE_STATUS');
export const GET_PULL_REQUEST_FROM_URL = createActionSet(
  'GET_PULL_REQUEST_FROM_URL'
);
export const MERGE_PULL_REQUEST = createActionSet('MERGE_PULL_REQUEST');
export const SUBMIT_NEW_ISSUE = createActionSet('SUBMIT_NEW_ISSUE');
