import { createSelector } from 'reselect';

export const getAuthFromStore = state => state.auth;

export const getAuthLocale = createSelector(
  getAuthFromStore,
  auth => auth.locale
);
