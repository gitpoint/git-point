import { schema } from 'normalizr';
import { userSchema } from './users';

export const issueCommentSchema = new schema.Entity(
  'issue_comments',
  {
    user: userSchema,
  },
  {
    idAttribute: comment => comment.id,
  }
);
