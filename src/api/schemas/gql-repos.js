import { schema } from 'normalizr';

export const gqlRepoSchema = new schema.Entity(
  'repos',
  {},
  {
    idAttribute: ({ repository }) => {
      return repository.nameWithOwner.toLowerCase();
    },
    processStrategy: ({ repository }) => ({
      ...repository,
      webUrl: `https://github.com/${repository.nameWithOwner}`,
    }),
  }
);
