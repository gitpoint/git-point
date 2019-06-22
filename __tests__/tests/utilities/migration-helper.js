import { getRepoIdFromUrl, toOldIssueFormat, toOldUserFormat } from 'utils';

describe('Migration Helper', () => {
  it('should return a repo id in {username}/{reponame} format', () => {
    const result = getRepoIdFromUrl(
      'https://api.github.com/repos/octocat/Hello-World'
    );

    expect(result).toBe('octocat/Hello-World');
  });

  it('should convert a user object to old format', () => {
    const user = {};
    const result = toOldUserFormat(user);
    const resultKeys = Object.keys(result);

    expect(result.avatar_url).toBe(user.avatarUrl);
    expect(
      Object.keys(user).reduce(
        (accum, key) => accum && resultKeys.includes(key),
        true
      )
    ).toBe(true);
  });

  it('should convert an issue object to old format', () => {
    const issue = {
      author: {},
      comments: {
        totalCount: 7,
      },
      closedAt: '',
      createdAt: '',
      number: 42,
      state: 'StAte',
    };
    const repoId = 'git-point';
    const result = toOldIssueFormat(issue, repoId);
    const resultKeys = Object.keys(result);

    expect(
      Object.keys(issue).reduce(
        (accum, key) => accum && resultKeys.includes(key),
        true
      )
    ).toBe(true);
    expect(result.comments).toBe(issue.comments.totalCount);
    expect(result.closed_at).toBe(issue.closedAt);
    expect(result.created_at).toBe(issue.createdAt);
    expect(result.state).toBe('state');
    expect(result.pull_request).toBeNull();
    expect(result.url).toBe('https://api.github.com/repos/git-point/issues/42');

    expect(toOldIssueFormat(issue, repoId, false).pull_request).toBeNull();
    expect(toOldIssueFormat(issue, repoId, true).pull_request).toMatchObject(
      {}
    );
  });
});
