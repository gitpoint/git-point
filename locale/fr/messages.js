module.exports = {
  languageData: {
    plurals: function(n, ord) {
      if (ord) return n == 1 ? 'one' : 'other';
      return n >= 0 && n < 2 ? 'one' : 'other';
    },
  },
  messages: {
    'Unknown event type: {0}': function(a) {
      return ['Unknown event type: ', a('0')];
    },
    '<0/> created branch <1/> in <2/>': '<0/> created branch <1/> in <2/>',
    '<0/> created tag <1/> in <2/>': '<0/> created tag <1/> in <2/>',
    '<0/> created repository <1/>': '<0/> a <1/> cr\xE9\xE9 le repository <1/>',
    '<0/> forked <1/> at <2/>': '<0/> a fork\xE9 <1/> en <2/>',
    '<0/> created wiki page {0} at <1/>': function(a) {
      return ['<0/> created wiki page ', a('0'), ' at <1/>'];
    },
    '<0/> edited wiki page {0} at <1/>': function(a) {
      return ['<0/> edited wiki page ', a('0'), ' at <1/>'];
    },
    '<0/> edit a comment on <1/> at <2/>':
      '<0/> edit a comment on <1/> at <2/>',
    '<0/> deleted a comment on <1/> at <2/>':
      '<0/> deleted a comment on <1/> at <2/>',
    '<0/> commented on pull request <1/> at <2/>':
      '<0/> commented on pull request <1/> at <2/>',
    '<0/> commented on issue <1/> at <2/>':
      '<0/> commented on issue <1/> at <2/>',
    '<0/> edited <1/> permissions in <2/>':
      '<0/> edited <1/> permissions in <2/>',
    '<0/> removed <1/> from <2/>': '<0/> removed <1/> from <2/>',
    '<0/> added <1/> to <2/>': '<0/> added <1/> to <2/>',
    '<0/> opened pull request <1/> in <2/>':
      '<0/> opened pull request <1/> in <2/>',
    '<0/> reopened pull request <1/> in <2/>':
      '<0/> reopened pull request <1/> in <2/>',
    '<0/> merged pull request <1/> in <2/>':
      '<0/> merged pull request <1/> in <2/>',
    '<0/> closed pull request <1/> in <2/>':
      '<0/> closed pull request <1/> in <2/>',
    '<0/> pushed to <1>{0} </1> in <2/>': function(a) {
      return ['<0/> pushed to <1>', a('0'), ' </1> in <2/>'];
    },
    '<0/> starred <1/>': '<0/> starred <1/>',
    Unhandled: 'Unhandled',
    '<0/> created branch <1>{0} </1> in <2/>': function(a) {
      return ['<0/> created branch <1>', a('0'), ' </1> in <2/>'];
    },
    '<0/> created tag <1>{0} </1> in <2/>': function(a) {
      return ['<0/> created tag <1>', a('0'), ' </1> in <2/>'];
    },
    'Hello lingui': 'Bonjour Lingui',
    '<0/>started watching <1/>': '<0/>started watching <1/>',
    'started watching <0/>': 'a commenc\xE9 \xE0 suivre <0/>',
  },
};
