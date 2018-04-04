import { schema } from 'normalizr';
import { userSchema } from './users';

export const issueSchema = new schema.Entity(
  'issues',
  {
    closed_by: userSchema,
    user: userSchema,
  },
  {
    // id: repoFullName-issueNumber
    idAttribute: issue =>
      `${issue.repository_url.replace('https://api.github.com/repos/', '')}-${
        issue.number
      }`,
  }
);
