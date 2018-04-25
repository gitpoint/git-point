export const toOldUserFormat = user => {
  return {
    ...user,
    avatar_url: user.avatarUrl,
  };
};

export const toOldIssueFormat = (issue, repoId, isPr = false) => {
  return {
    ...issue,
    user: toOldUserFormat(issue.author),
    comments: issue.comments.totalCount,
    created_at: issue.createdAt,
    closed_at: issue.closedAt,
    state: issue.state.toLowerCase(),
    pull_request: isPr ? {} : null,
    url: `https://api.github.com/repos/${repoId}/issues/${issue.number}`,
  };
};

export const getRepoIdFromUrl = url =>
  url.replace(/https:\/\/api.github.com\/repos\/(.+)\/(.+)\/?/, '$1/$2');
