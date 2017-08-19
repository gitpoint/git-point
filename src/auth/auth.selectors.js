import { createSelector } from 'reselect';

export const getAuthFromStore = state => state.auth;

export const getAuthLanguage = createSelector(
  getAuthFromStore,
  auth => auth.getAuthLanguage
);
