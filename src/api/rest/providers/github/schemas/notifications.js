import { schema } from 'normalizr';
import { initSchema, toTimestamp } from 'utils';

import { repoSchema } from './repos';

export const notificationSchema = new schema.Entity(
  'notifications',
  {
    repo: repoSchema,
  },
  {
    idAttribute: notification => notification.id,
    processStrategy: entity => ({
      ...initSchema(),
      id: entity.id,
      updatedAt: toTimestamp(entity.updated_at),
      unread: entity.unread,
      reason: entity.reason, // TODO: normalize it
      type: entity.subject.type, // TODO: normalize it
      link: entity.subject.url,
      title: entity.subject.title,
      repo: entity.repository,
    }),
  }
);
