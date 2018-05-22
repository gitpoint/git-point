import { schema } from 'normalizr';
import { repoSchema } from './repos';

export const eventSchema = new schema.Entity(
  'events',
  {
    repo: repoSchema,
    payload: {
      forkee: repoSchema,
    },
  },
  {
    idAttribute: event => event.id,
  }
);
