import { createSelector } from 'reselect';
import { getOrganization as getOrganizationFromStore } from '../../root.reducer';

export const getOrganization = createSelector(
  getOrganizationFromStore,
  organization => organization.organization || {}
);

export const getOrganizationRepositories = createSelector(
  getOrganizationFromStore,
  organization => organization.repositories || []
);

export const getOrganizationMemebers = createSelector(
  getOrganizationFromStore,
  organization => organization.repositories || []
);

export const getOrganizationIsPendingOrg = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingOrg || []
);

export const getOrganizationIsPendingRepos = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingRepos || []
);

export const getOrganizationIsPendingMembers = createSelector(
  getOrganizationFromStore,
  organization => organization.isPendingMembers || []
);

export const getOrganizationError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationError || []
);

export const getOrganizationRepositoriesError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationRepositoriesError || []
);

export const getOrganizationMembersError = createSelector(
  getOrganizationFromStore,
  organization => organization.organizationMembersError || []
);
