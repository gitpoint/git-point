import { schema } from 'normalizr';

export const orgSchema = new schema.Entity(
  'orgs',
  {},
  {
    idAttribute: org => org.login,
  }
);
