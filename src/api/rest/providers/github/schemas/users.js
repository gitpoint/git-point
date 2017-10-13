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

        // The entity is to be considered complete.
        processed._isComplete = true;
      }

      return processed;
    },
  }
);

/**

const userFull = {
  "login": "machour",
  "id": 304450,
  "avatar_url": "https://avatars2.githubusercontent.com/u/304450?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/machour",
  "html_url": "https://github.com/machour",
  "followers_url": "https://api.github.com/users/machour/followers",
  "following_url": "https://api.github.com/users/machour/following{/other_user}",
  "gists_url": "https://api.github.com/users/machour/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/machour/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/machour/subscriptions",
  "organizations_url": "https://api.github.com/users/machour/orgs",
  "repos_url": "https://api.github.com/users/machour/repos",
  "events_url": "https://api.github.com/users/machour/events{/privacy}",
  "received_events_url": "https://api.github.com/users/machour/received_events",
  "type": "User",
  "site_admin": false,


  "name": "Mehdi Achour",
  "company": "IDK",
  "blog": "https://machour.idk.tn/",
  "location": "Tunis",
  "email": null,
  "hireable": true,
  "bio": null,
  "public_repos": 55,
  "public_gists": 4,
  "followers": 61,
  "following": 42,
  "created_at": "2010-06-14T01:09:25Z",
  "updated_at": "2017-10-04T06:11:32Z"
}

 */
