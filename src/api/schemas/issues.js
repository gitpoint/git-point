import { schema } from 'normalizr';
import { userSchema } from './users';
import { issueLabelSchema } from './issue-labels';

export const issueSchema = new schema.Entity(
  'issues',
  {
    closed_by: userSchema,
    user: userSchema,
    assignee: userSchema,
    assignees: [userSchema],
    labels: [issueLabelSchema],
  },
  {
    // id: repoFullName-issueNumber
    idAttribute: issue =>
      `${issue.repository_url.replace('https://api.github.com/repos/', '')}-${
        issue.number
      }`,
    processStrategy: issue => ({
      ...issue,
      isPr: typeof issue.pull_request !== 'undefined',
    }),
  }
);
