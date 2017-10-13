import moment from 'moment/min/moment.min';

export const toTimestamp = value => parseInt(moment(value).format('x'), 10);

export const initSchema = () => ({
  _isComplete: false, // entity not fully fetched yet
  _isAuth: false, // entity doesn't belong to the auth user
  _entityUrl: false, // The github url for the entity. To be used in openInBrowser()
  _fetchedAt: toTimestamp(),
});
