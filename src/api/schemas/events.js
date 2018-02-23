import { schema } from 'normalizr';

export const eventSchema = new schema.Entity(
  'events',
  {},
  {
    idAttribute: event => event.id,
  }
);
