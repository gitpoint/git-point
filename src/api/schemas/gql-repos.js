import { schema } from 'normalizr';

export const gqlRepoSchema = new schema.Entity(
  'gqlRepos',
  {},
  {
    idAttribute: ({ repository }) => {
      return repository.nameWithOwner.toLowerCase();
    },
    processStrategy: ({ repository }) => repository,
  }
);
