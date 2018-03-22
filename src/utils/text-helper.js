import emoji from 'node-emoji';

export const emojifyText = text => {
  return emoji.emojify(text);
};

export const abbreviateNumber = (count, thousandUnit) => {
  if (count > 999) {
    return count % 1000 < 50
      ? (count / 1000).toFixed(0) + thousandUnit
      : (count / 1000).toFixed(1) + thousandUnit;
  }

  return count;
};
