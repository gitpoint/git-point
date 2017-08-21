import { createSelector } from 'reselect';

const getOrganizationFromStore = state => state.organization;

export const getOrganization = createSelector(
  getOrganizationFromStore,
  organization => organization.organization || {}
);

export const getOrganizationRepositories = createSelector(
  getOrganizationFromStore,
  organization => organization.repositories || []
);

export const getOrganizationMembers = createSelector(
  getOrganizationFromStore,
  organization => organization.members || []
);

export const getOrganizationIsPendingOrg = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingOrg || false
);

export const getOrganizationIsPendingRepos = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingRepos || false
);

export const getOrganizationIsPendingMembers = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingMembers || false
);

export const getOrganizationError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationError || ''
);

export const getOrganizationRepositoriesError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationRepositoriesError || ''
);

export const getOrganizationMembersError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationMembersError || ''
);
