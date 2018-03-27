import { createSelector } from 'reselect';

const getOrganizationFromStore = state => state.organization;

export const getOrganizationRepositories = createSelector(
  getOrganizationFromStore,
  organization => organization.repositories || []
);

export const getOrganizationIsPendingRepos = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingRepos || false
);

export const getOrganizationRepositoriesError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationRepositoriesError || ''
);
