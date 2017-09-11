import { createActionSet } from 'utils';

export const GET_USER = createActionSet('GET_USER');
export const GET_ORGS = createActionSet('GET_ORGS');
export const GET_IS_FOLLOWING = createActionSet('GET_IS_FOLLOWING');
export const GET_IS_FOLLOWER = createActionSet('GET_IS_FOLLOWER');
export const GET_REPOSITORIES = createActionSet('GET_REPOSITORIES');
export const GET_FOLLOWERS = createActionSet('GET_FOLLOWERS');
export const GET_FOLLOWING = createActionSet('GET_FOLLOWING');
export const SEARCH_USER_REPOS = createActionSet('SEARCH_USER_REPOS');
export const CHANGE_FOLLOW_STATUS = createActionSet('CHANGE_FOLLOW_STATUS');
export const GET_STAR_COUNT = createActionSet('GET_STAR_COUNT');
