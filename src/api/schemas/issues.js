import { schema } from 'normalizr';

export const issueSchema = new schema.Entity(
  'issues',
  {},
  {
    idAttribute: issue => issue.url,
  }
);

// TODO: some events have no id field, i.e. cross-referenced
export const issueTimelineItemSchema = new schema.Entity('issueTimelineItems');
