import { schema } from 'normalizr';
import { initSchema, toTimestamp } from 'utils';

export const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: user => user.login.toLowerCase(),
    processStrategy: entity => {
      const processed = initSchema();

      // These are provided in both mini & full modes
      processed.id = entity.login.toLowerCase(); // id should be always used for navigation
      processed.login = entity.login;
      processed.avatarUrl = entity.avatar_url;

      // name is only present in full mode, we base our full parsing on its presence
      if (typeof entity.name !== 'undefined') {
        processed.fullName = entity.name;
        processed.company = entity.company;
        processed.webSite = entity.blog;
        processed.location = entity.location;
        processed.bio = entity.bio;

        processed.countPublicRepos = entity.public_repos;
        processed.countPrivateRepos = 0;
        processed.countRepos = entity.public_repos;
        processed.countFollowers = entity.followers;
        processed.countFollowing = entity.following;

        processed.createdAt = toTimestamp(entity.created_at); // as unix timestamp
        processed.updatedAt = toTimestamp(entity.updated_at); // as unix timestamp

        // Clear avatar cached URL to make sure picture is refetched on profile change
        processed.avatarUrl += `&updatedAt=${processed.updatedAt}`;

        processed._entityUrl = `https://github.com/${entity.login}`;

        // The entity is to be considered complete.
        processed._isComplete = true;
      }

      return processed;
    },
  }
);
