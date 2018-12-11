import { schema } from 'normalizr';

export const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: user => user.login,
  }
);
