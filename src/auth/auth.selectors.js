import { createSelector } from 'reselect';

import { getAuth as getAuthFromStore } from '../../root.reducer';

export const getAuthLanguage = createSelector(
  getAuthFromStore,
  auth => auth.getAuthLanguage
);
