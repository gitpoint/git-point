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
      processed.defaultBranch = entity.default_branch;
      processed.language = entity.language; // needs to be normalized

      if (entity.owner.type === 'User') {
        processed.userOwner = entity.owner;
        processed.orgOwner = false;
      } else {
        processed.userOwner = false;
        processed.orgOwner = entity.owner;
      }

      processed.countStargazzers = entity.stargazers_count;
      processed.countForks = entity.forks_count;
      processed.countWatchers = entity.watchers_count;
      processed.countOpenIssues = entity.open_issues_count;

      processed.hasIssues = entity.has_issues;

      processed._entityUrl = entity.html_url;

      return processed;
    },
  }
);

/*

 // GITHUB REPOS SCHEMAS

const fullMember =  { id: 93332398,
    name: 'git-point-site',
    full_name: 'gitpoint/git-point-site',
    owner:
     { login: 'gitpoint',
       id: 30082377,
       avatar_url: 'https://avatars0.githubusercontent.com/u/30082377?v=4',
       gravatar_id: '',
       url: 'https://api.github.com/users/gitpoint',
       html_url: 'https://github.com/gitpoint',
       followers_url: 'https://api.github.com/users/gitpoint/followers',
       following_url: 'https://api.github.com/users/gitpoint/following{/other_user}',
       gists_url: 'https://api.github.com/users/gitpoint/gists{/gist_id}',
       starred_url: 'https://api.github.com/users/gitpoint/starred{/owner}{/repo}',
       subscriptions_url: 'https://api.github.com/users/gitpoint/subscriptions',
       organizations_url: 'https://api.github.com/users/gitpoint/orgs',
       repos_url: 'https://api.github.com/users/gitpoint/repos',
       events_url: 'https://api.github.com/users/gitpoint/events{/privacy}',
       received_events_url: 'https://api.github.com/users/gitpoint/received_events',
       type: 'Organization',
       site_admin: false },
    private: false,
    html_url: 'https://github.com/gitpoint/git-point-site',
    description: null,
    fork: false,
    url: 'https://api.github.com/repos/gitpoint/git-point-site',
    forks_url: 'https://api.github.com/repos/gitpoint/git-point-site/forks',
    keys_url: 'https://api.github.com/repos/gitpoint/git-point-site/keys{/key_id}',
    collaborators_url: 'https://api.github.com/repos/gitpoint/git-point-site/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/gitpoint/git-point-site/teams',
    hooks_url: 'https://api.github.com/repos/gitpoint/git-point-site/hooks',
    issue_events_url: 'https://api.github.com/repos/gitpoint/git-point-site/issues/events{/number}',
    events_url: 'https://api.github.com/repos/gitpoint/git-point-site/events',
    assignees_url: 'https://api.github.com/repos/gitpoint/git-point-site/assignees{/user}',
    branches_url: 'https://api.github.com/repos/gitpoint/git-point-site/branches{/branch}',
    tags_url: 'https://api.github.com/repos/gitpoint/git-point-site/tags',
    blobs_url: 'https://api.github.com/repos/gitpoint/git-point-site/git/blobs{/sha}',
    git_tags_url: 'https://api.github.com/repos/gitpoint/git-point-site/git/tags{/sha}',
    git_refs_url: 'https://api.github.com/repos/gitpoint/git-point-site/git/refs{/sha}',
    trees_url: 'https://api.github.com/repos/gitpoint/git-point-site/git/trees{/sha}',
    statuses_url: 'https://api.github.com/repos/gitpoint/git-point-site/statuses/{sha}',
    languages_url: 'https://api.github.com/repos/gitpoint/git-point-site/languages',
    stargazers_url: 'https://api.github.com/repos/gitpoint/git-point-site/stargazers',
    contributors_url: 'https://api.github.com/repos/gitpoint/git-point-site/contributors',
    subscribers_url: 'https://api.github.com/repos/gitpoint/git-point-site/subscribers',
    subscription_url: 'https://api.github.com/repos/gitpoint/git-point-site/subscription',
    commits_url: 'https://api.github.com/repos/gitpoint/git-point-site/commits{/sha}',
    git_commits_url: 'https://api.github.com/repos/gitpoint/git-point-site/git/commits{/sha}',
    comments_url: 'https://api.github.com/repos/gitpoint/git-point-site/comments{/number}',
    issue_comment_url: 'https://api.github.com/repos/gitpoint/git-point-site/issues/comments{/number}',
    contents_url: 'https://api.github.com/repos/gitpoint/git-point-site/contents/{+path}',
    compare_url: 'https://api.github.com/repos/gitpoint/git-point-site/compare/{base}...{head}',
    merges_url: 'https://api.github.com/repos/gitpoint/git-point-site/merges',
    archive_url: 'https://api.github.com/repos/gitpoint/git-point-site/{archive_format}{/ref}',
    downloads_url: 'https://api.github.com/repos/gitpoint/git-point-site/downloads',
    issues_url: 'https://api.github.com/repos/gitpoint/git-point-site/issues{/number}',
    pulls_url: 'https://api.github.com/repos/gitpoint/git-point-site/pulls{/number}',
    milestones_url: 'https://api.github.com/repos/gitpoint/git-point-site/milestones{/number}',
    notifications_url: 'https://api.github.com/repos/gitpoint/git-point-site/notifications{?since,all,participating}',
    labels_url: 'https://api.github.com/repos/gitpoint/git-point-site/labels{/name}',
    releases_url: 'https://api.github.com/repos/gitpoint/git-point-site/releases{/id}',
    deployments_url: 'https://api.github.com/repos/gitpoint/git-point-site/deployments',
    created_at: '2017-06-04T18:11:50Z',
    updated_at: '2017-09-28T22:13:04Z',
    pushed_at: '2017-10-04T02:08:59Z',
    git_url: 'git://github.com/gitpoint/git-point-site.git',
    ssh_url: 'git@github.com:gitpoint/git-point-site.git',
    clone_url: 'https://github.com/gitpoint/git-point-site.git',
    svn_url: 'https://github.com/gitpoint/git-point-site',
    homepage: null,
    size: 4656,
    stargazers_count: 9,
    watchers_count: 9,
    language: 'CSS',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 3,
    mirror_url: null,
    open_issues_count: 0,
    forks: 3,
    open_issues: 0,
    watchers: 9,
    default_branch: 'master',

    permissions: { admin: false, push: true, pull: true } } ];

    // only in full
parent: {},
source: {},
network_count: 9,
subscribers_count: 2

*/
