module.exports = {
  languageData: {
    plurals: function(n, ord) {
      var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
      if (ord)
        return n10 == 1 && n100 != 11
          ? 'one'
          : n10 == 2 && n100 != 12
            ? 'two'
            : n10 == 3 && n100 != 13 ? 'few' : 'other';
      return n == 1 && v0 ? 'one' : 'other';
    },
  },
  messages: {
    '<0/> commented on commit': '<0/> commented on commit',
    '<0/> created branch <1/> at <2/>': '<0/> created branch <1/> at <2/>',
    '<0/> created tag <1/> at <2/>': '<0/> created tag <1/> at <2/>',
    '<0/> deleted branch <1/> at <2/>': '<0/> deleted branch <1/> at <2/>',
    '<0/> deleted tag <1/> at <2/>': '<0/> deleted tag <1/> at <2/>',
    '<0/> created the <1/> wiki': '<0/> created the <1/> wiki',
    '<0/> edited the <1/> wiki': '<0/> edited the <1/> wiki',
    'Unknown event type: {0}': function(a) {
      return ['Unknown event type: ', a('0')];
    },
    '<0/> created repository <1/>': '<0/> created repository <1/>',
    '<0/> forked <1/> at <2/>': '<0/> forked <1/> at <2/>',
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
    '<0/> created branch <1/> in <2/>': '<0/> created branch <1/> in <2/>',
    '<0/> created tag <1/> in <2/>': '<0/> created tag <1/> in <2/>',
    '<0/> created wiki page {0} at <1/>': function(a) {
      return ['<0/> created wiki page ', a('0'), ' at <1/>'];
    },
    '<0/> edited wiki page {0} at <1/>': function(a) {
      return ['<0/> edited wiki page ', a('0'), ' at <1/>'];
    },
    Unhandled: 'Unhandled',
    '<0/> created branch <1>{0} </1> in <2/>': function(a) {
      return ['<0/> created branch <1>', a('0'), ' </1> in <2/>'];
    },
    '<0/> created tag <1>{0} </1> in <2/>': function(a) {
      return ['<0/> created tag <1>', a('0'), ' </1> in <2/>'];
    },
    'Hello lingui': 'Hello lingui',
    '<0/>started watching <1/>': '<0/>started watching <1/>',
    'started watching <0/>': 'started watching <0/>',
  },
};
