export default [
  {
    code: 'ca',
    emojiCode: ':waving_white_flag:',
    name: 'Català',
  },
  {
    code: 'de',
    emojiCode: ':flag-de:',
    name: 'Deutsch',
  },
  {
    code: 'en',
    emojiCode: ':flag-us:',
    name: 'English',
  },
  {
    code: 'eo',
    emojiCode: ':waving_white_flag:',
    name: 'Esperanto',
  },
  {
    code: 'es',
    emojiCode: ':flag-es:',
    name: 'Español',
  },
  {
    code: 'eu',
    emojiCode: ':waving_white_flag:',
    name: 'Basque',
  },
  {
    code: 'fr',
    emojiCode: ':flag-fr:',
    name: 'Français',
  },
  {
    code: 'gl',
    emojiCode: ':waving_white_flag:',
    name: 'Galego',
  },
  {
    code: 'id',
    emojiCode: ':flag-id:',
    name: 'Bahasa',
  },
  {
    code: 'it',
    emojiCode: ':flag-it:',
    name: 'Italiano',
  },
  {
    code: 'nb',
    emojiCode: ':waving_white_flag:',
    name: 'Norsk',
  },
  {
    code: 'nl',
    emojiCode: ':flag-nl:',
    name: 'Nederlands',
  },
  {
    code: 'ph',
    emojiCode: ':flag-ph:',
    name: 'Tagalog',
  },
  {
    code: 'pl',
    emojiCode: ':flag-pl:',
    name: 'Polski',
  },
  {
    code: 'pt',
    emojiCode: ':flag-pt:',
    name: 'Português de Portugal',
  },
  {
    code: 'ptBr',
    emojiCode: ':flag-br:',
    name: 'Português do Brasil',
  },
  {
    code: 'ru',
    emojiCode: ':flag-ru:',
    name: 'Русский',
  },
  {
    code: 'sr',
    emojiCode: ':flag-rs:',
    name: 'Српски',
  },
  {
    code: 'sv',
    emojiCode: ':flag-se:',
    name: 'Svenska',
  },
  {
    code: 'th',
    emojiCode: ':flag-th:',
    name: 'ภาษาไทย',
  },
  {
    code: 'tr',
    emojiCode: ':flag-tr:',
    name: 'Türkçe',
  },
  {
    code: 'uk',
    emojiCode: ':flag-ua:',
    name: 'Українська',
  },
  {
    code: 'zhCn',
    emojiCode: ':flag-cn:',
    name: '简体中文',
  },
  {
    code: 'zhTw',
    emojiCode: ':flag-tw:',
    name: '正體中文',
  },
].sort((a, b) => {
  // Sort the languages based on their name.
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
});
