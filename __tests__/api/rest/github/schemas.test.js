import 'react-native';
import { normalize } from 'normalizr';
import schemas from 'api/rest/providers/github/schemas';

import mocks from './mocks';

jest.mock('react-native-i18n', () => {
  return {};
});
Date.now = jest.fn(() => 1508189841664);

it('normalizes user correctly', () => {
  expect(normalize(mocks.userJson, schemas.USER)).toMatchSnapshot();
});

it('normalizes repo correctly', () => {
  expect(normalize(mocks.repoJson, schemas.REPO)).toMatchSnapshot();
});

it('normalizes org correctly', () => {
  expect(normalize(mocks.orgJson, schemas.ORG)).toMatchSnapshot();
});

it('normalizes events correctly', () => {
  expect(normalize(mocks.eventsJson, schemas.EVENT_ARRAY)).toMatchSnapshot();
});

it('normalizes notifications correctly', () => {
  expect(
    normalize(mocks.notificationsJson, schemas.NOTIFICATION_ARRAY)
  ).toMatchSnapshot();
});
