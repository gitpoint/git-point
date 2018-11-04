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
      full_name: repository.nameWithOwner,
      webUrl: `https://github.com/${repository.nameWithOwner}`,
    }),
  }
);
