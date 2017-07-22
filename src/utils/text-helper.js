import emoji from 'node-emoji';

export const emojifyText = text => {
  return emoji.emojify(text);
};
