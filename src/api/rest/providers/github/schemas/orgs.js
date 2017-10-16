import { schema } from 'normalizr';
import { initSchema, toTimestamp } from 'utils';

export const orgSchema = new schema.Entity(
  'orgs',
  {},
  {
    idAttribute: org => org.login.toLowerCase(),
    processStrategy: entity => {
      const processed = initSchema();

      // These are provided in both mini & full modes
      processed.id = entity.login.toLowerCase(); // id should be always used for navigation
      processed.login = entity.login;
      processed.avatarUrl = entity.avatar_url;

      // name is only present in full mode, we base our full parsing on its presence
      if (typeof entity.name !== 'undefined') {
        processed.name = entity.name;
        processed.webSite = entity.blog;
        processed.location = entity.location;
        processed.description = entity.description;

        processed.countPublicRepos = entity.public_repos;
        processed.countPrivateRepos = 0;
        processed.countRepos = entity.public_repos;

        processed._entityUrl = entity.html_url;

        processed.createdAt = toTimestamp(entity.created_at);
        processed.updatedAt = toTimestamp(entity.updated_at);

        // Clear avatar cached URL to make sure picture is refetched on profile change
        processed.avatarUrl += `&updatedAt=${processed.updatedAt}`;

        // The entity is to be considered complete.
        processed._isComplete = true;

        if (typeof entity.total_private_repos !== 'undefined') {
          // This org belongs to the authenticated user, update some props
          processed._isAuth = true;
          processed.countPrivateRepos = entity.total_private_repos;
          processed.countRepos += entity.total_private_repos;
        }
      } else {
        // We can try our best to fill in some props on our own:
        processed._entityUrl = `https://github.com/${processed.id}`;
      }

      return processed;
    },
  }
);
