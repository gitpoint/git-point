import { schema } from 'normalizr';

const getLabelFqnFromUrl = url => {
  // "https://api.github.com/repos/machour2/test/labels/bug"
  return url.replace(
    /https:\/\/api.github.com\/repos\/(.+)\/(.+)\/labels\/(.+)$/,
    '$1/$2-$3'
  );
};

export const issueLabelSchema = new schema.Entity(
  'issue_labels',
  {},
  {
    idAttribute: label => getLabelFqnFromUrl(label.url),
  }
);
