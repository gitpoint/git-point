import { schema } from 'normalizr';
import { userSchema } from './users';

export const issueEventSchema = new schema.Entity(
  'issue_events',
  {
    actor: userSchema,
  },
  {
    idAttribute: issue => issue.id,
  }
);
