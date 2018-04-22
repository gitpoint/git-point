import { schema } from 'normalizr';

const formatIssues = (list, repoId, isPR = false) => {
  if (!list.edges) return [];

  return list.edges.map(({ node }) => ({
    ...node,
    state: node.state.toLowerCase(),
    comments: node.comments.totalCount,
    created_at: node.createdAt,
    closed_at: node.closedAt,
    pull_request: isPR,
    user: node.author,
    url: `https://api.github.com/repos/${repoId}/issues/${node.number}`,
  }));
};

export const gqlRepoSchema = new schema.Entity(
  'gqlRepos',
  {},
  {
    idAttribute: ({ data: { repository } }) => {
      return repository.fullName.toLowerCase();
    },
    processStrategy: ({ data: { repository } }) => {
      return {
        name: repository.name,
        fullName: repository.fullName,
        isFork: repository.isFork,
        forkedFrom: repository.parent ? repository.parent.nameWithOwner : null,
        forkCount: repository.forkCount,
        defaultBranchName: repository.defaultBranchRef.name,
        hasReadme: repository.README !== null,
        stargazersCount: repository.stargazers.totalCount,
        watchersCount: repository.watchers.totalCount,
        isStarred: repository.viewerHasStarred,
        isSubscribed: repository.viewerSubscription === 'SUBSCRIBED',
        description: repository.description,
        html_url: repository.url,
        parent: repository.parent
          ? {
              fullName: repository.parent.fullName,
              url: `https://api.github.com/repos/${repository.parent.fullName}`,
            }
          : null,
        primaryLanguage: repository.primaryLanguage,
        issuesCount: repository.issuesCount.totalCount,
        pullRequestsCount: repository.pullRequestsCount.totalCount,
        owner: {
          login: repository.owner.login,
          avatar_url: repository.owner.avatarUrl,
        },
        topics: repository.repositoryTopics.edges
          ? repository.repositoryTopics.edges.map(item => item.node.topic.name)
          : [],
        hasIssuesEnabled: repository.hasIssuesEnabled,
        openIssuesPreview: formatIssues(
          repository.openIssues,
          repository.fullName
        ),
        openPullRequestsPreview: formatIssues(
          repository.openPullRequests,
          repository.fullName,
          true
        ),
        issues: formatIssues(repository.issues, repository.fullName),
        pullRequests: formatIssues(
          repository.pullRequests,
          repository.fullName
        ),
        contents_url: `https://api.github.com/repos/${
          repository.fullName
        }/contents`,
      };
    },
  }
);
