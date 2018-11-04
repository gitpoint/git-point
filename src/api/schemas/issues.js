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
const issueIgnoredEvent = new schema.Entity('issueIgnoredEvents');

export const issueTimelineItemSchema = new schema.Union(
  {
    issueComment,
    issueEvent,
    issueIgnoredEvent,
  },
  item => {
    if (!item.id) {
      // i.e. 'cross-referenced'
      return 'issueIgnoredEvents';
    } else if (item.event === 'commented') {
      return 'issueComment';
    }

    return 'issueEvent';
  }
);
