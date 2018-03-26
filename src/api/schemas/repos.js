import { schema } from 'normalizr';

export const repoSchema = new schema.Entity(
  'repos',
  {},
  {
    idAttribute: repo => repo.full_name.toLowerCase(),
  }
);
