import { schema } from 'normalizr';

export const issueSchema = new schema.Entity(
  'issues',
  {},
  {
    idAttribute: issue => issue.url,
  }
);

const issueComment = new schema.Entity('issueComments');
const issueEvent = new schema.Entity('issueEvents');

export const issueTimelineItemSchema = new schema.Union(
  {
    issueComment,
    issueEvent,
  },
  item => {
    const tokens = item.url.split('/');

    tokens.pop(); // the last is id

    const type = tokens.pop();

    switch (type) {
      case 'comments':
        return 'issueComment';
      case 'events':
      default:
        return 'issueEvent';
    }
  }
);
