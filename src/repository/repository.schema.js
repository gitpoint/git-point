import { schema } from 'normalizr';
import omit from 'lodash/omit';

import { userSchema } from '../user/user.schema';

/*
export const userSchema = new schema.Entity('users', {}, {
    idAttribute: user => user.login.toLowerCase(),

});*/

export const repoSchema = new schema.Entity(
  'repos',
  {
    owner: userSchema,
  },
  {
    idAttribute: repo => {
      if (typeof repo.full_name === 'string') {
        return repo.full_name.toLowerCase();
      }

      // In Events
      return repo.name.toLowerCase();
    },
    processStrategy: entity => omit(entity, [
      'url',
      'html_url',
      'url',
      'forks_url',
      'keys_url',
      'collaborators_url',
      'teams_url',
      'hooks_url',
      'issue_events_url',
      'events_url',
      'assignees_url',
      'git_url',
      'ssh_url',
      'clone_url',
      'svn_url',
      'branches_url',
      'tags_url',
      'blobs_url',
      'git_tags_url',
      'git_refs_url',
      'trees_url',
      'statuses_url',
      'languages_url',
      'stargazers_url',
      'contributors_url',
      'subscribers_url',
      'subscription_url',
      'commits_url',
      'git_commits_url',
      'comments_url',
      'issue_comment_url',
      'contents_url',
      'compare_url',
      'merges_url',
      'archive_url',
      'downloads_url',
      'issues_url',
      'pulls_url',
      'milestones_url',
      'notifications_url',
      'labels_url',
      'releases_url',
      'deployments_url',
    ]),
  }
);
