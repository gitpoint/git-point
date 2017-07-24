import emoji from 'node-emoji';

const thousandUnit = 'k';

export const emojifyText = text => {
  return emoji.emojify(text);
};

export const starNumbersText = count => {
  return count >= 1000 ? (count / 1000).toFixed(1) + thousandUnit : count;
};
