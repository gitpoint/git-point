import { schema } from 'normalizr';
import { initSchema } from 'utils';

import { userSchema } from './users';
import { orgSchema } from './orgs';

const isInMinimalisticForm = entity => typeof entity.full_name === 'undefined';

export const repoSchema = new schema.Entity(
  'repos',
  {
    userOwner: userSchema,
    orgOwner: orgSchema,
  },
  {
    idAttribute: repo =>
      (isInMinimalisticForm(repo) ? repo.name : repo.full_name).toLowerCase(),
    processStrategy: entity => {
      const processed = initSchema();

      // Repo received from events
      if (isInMinimalisticForm(entity)) {
        processed.id = entity.name.toLowerCase();
        processed.fullName = entity.name;
        processed.shortName = entity.name.substring(
          entity.name.indexOf('/') + 1
        );
        processed._entityUrl = `https://github.com/${entity.name}`;

        return processed;
      }

      processed.id = entity.full_name.toLowerCase();
      processed.fullName = entity.full_name;
      processed.shortName = entity.name;
      processed.description = entity.description;
      processed.private = entity.private;

      if (entity.owner.type === 'User') {
        processed.userOwner = entity.owner;
        processed.orgOwner = false;
      } else {
        processed.userOwner = false;
        processed.orgOwner = entity.owner;
      }

      if (typeof entity.default_branch !== 'undefined') {
        processed.defaultBranch = entity.default_branch;
        processed.language = entity.language; // needs to be normalized

        processed.countStargazzers = entity.stargazers_count;
        processed.countForks = entity.forks_count;
        processed.countWatchers = entity.watchers_count;
        processed.countOpenIssues = entity.open_issues_count;

        processed.hasIssues = entity.has_issues;
      }

      processed._entityUrl = entity.html_url;

      return processed;
    },
  }
);
