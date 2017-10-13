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
      processed.description = entity.description;

      // name is only present in full mode, we base our full parsing on its presence
      if (typeof entity.name !== 'undefined') {
        processed.name = entity.name;
        processed.webSite = entity.blog;
        processed.location = entity.location;

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

/*

 // GITHUB ORGS SCHEMAS

const fullAuth = { login: 'gitpoint',
  id: 30082377,
  url: 'https://api.github.com/orgs/gitpoint',
  repos_url: 'https://api.github.com/orgs/gitpoint/repos',
  events_url: 'https://api.github.com/orgs/gitpoint/events',
  hooks_url: 'https://api.github.com/orgs/gitpoint/hooks',
  issues_url: 'https://api.github.com/orgs/gitpoint/issues',
  members_url: 'https://api.github.com/orgs/gitpoint/members{/member}',
  public_members_url: 'https://api.github.com/orgs/gitpoint/public_members{/member}',
  avatar_url: 'https://avatars0.githubusercontent.com/u/30082377?v=4',
  description: 'An open source GitHub client for iOS and Android. Built with React Native :iphone:',

  name: 'GitPoint',
  company: null,
  blog: 'https://gitpoint.co',
  location: 'Toronto',
  email: '',
  has_organization_projects: true,
  has_repository_projects: true,
  public_repos: 2,
  public_gists: 0,
  followers: 0,
  following: 0,
  html_url: 'https://github.com/gitpoint',
  created_at: '2017-07-11T15:49:07Z',
  updated_at: '2017-08-04T00:50:57Z',
  type: 'Organization',

  total_private_repos: 0,
  owned_private_repos: 0,
  private_gists: null,
  disk_usage: null,
  collaborators: null,
  billing_email: null,
  plan: { name: 'free',
     space: 976562499,
     private_repos: 0,
     filled_seats: 12,
     seats: 0 },
  default_repository_permission: null,
  members_can_create_repositories: false,
};

const full = {
  login: 'gitpoint',
  id: 30082377,
  url: 'https://api.github.com/orgs/gitpoint',
  repos_url: 'https://api.github.com/orgs/gitpoint/repos',
  events_url: 'https://api.github.com/orgs/gitpoint/events',
  hooks_url: 'https://api.github.com/orgs/gitpoint/hooks',
  issues_url: 'https://api.github.com/orgs/gitpoint/issues',
  members_url: 'https://api.github.com/orgs/gitpoint/members{/member}',
  public_members_url: 'https://api.github.com/orgs/gitpoint/public_members{/member}',
  avatar_url: 'https://avatars0.githubusercontent.com/u/30082377?v=4',
  description: 'An open source GitHub client for iOS and Android. Built with React Native :iphone:',

  name: 'GitPoint',
  company: null,
  blog: 'https://gitpoint.co',
  location: 'Toronto',
  email: '',
  has_organization_projects: true,
  has_repository_projects: true,
  public_repos: 2,
  public_gists: 0,
  followers: 0,
  following: 0,
  html_url: 'https://github.com/gitpoint',
  created_at: '2017-07-11T15:49:07Z',
  updated_at: '2017-08-04T00:50:57Z',
  type: 'Organization',
};

const mini = {
  login: 'gitpoint',
  id: 30082377,
  url: 'https://api.github.com/orgs/gitpoint',
  repos_url: 'https://api.github.com/orgs/gitpoint/repos',
  events_url: 'https://api.github.com/orgs/gitpoint/events',
  hooks_url: 'https://api.github.com/orgs/gitpoint/hooks',
  issues_url: 'https://api.github.com/orgs/gitpoint/issues',
  members_url: 'https://api.github.com/orgs/gitpoint/members{/member}',
  public_members_url: 'https://api.github.com/orgs/gitpoint/public_members{/member}',
  avatar_url: 'https://avatars0.githubusercontent.com/u/30082377?v=4',
  description: 'An open source GitHub client for iOS and Android. Built with React Native :iphone:',
};

*/
