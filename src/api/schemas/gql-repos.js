import { schema } from 'normalizr';

const ghostUser = {
  login: 'ghost',
  avatarUrl: 'https://avatars3.githubusercontent.com/u/10137?v=4',
  type: 'User',
};

const fillGhostUser = obj => ({
  ...obj,
  nodes: obj.nodes.map(node => ({
    ...node,
    author: node.author || ghostUser,
  })),
});

export const gqlRepoSchema = new schema.Entity(
  'gqlRepos',
  {},
  {
    idAttribute: ({ repository }) => {
      return repository.nameWithOwner;
    },
    processStrategy: ({ repository }) => ({
      ...repository,
      openIssuesPreview: fillGhostUser(repository.openIssuesPreview),
      openPullRequestsPreview: fillGhostUser(
        repository.openPullRequestsPreview
      ),
      permissions: {
        admin: repository.viewerPermission === 'ADMIN',
        push:
          repository.viewerPermission === 'ADMIN' ||
          repository.viewerPermission === 'WRITE',
      },
      full_name: repository.nameWithOwner,
      webUrl: `https://github.com/${repository.nameWithOwner}`,
    }),
  }
);
