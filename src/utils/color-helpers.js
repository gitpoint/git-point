import { colors } from 'config';

export const getFontColorByBackground = bgColor => {
  const r = parseInt(bgColor.substr(0, 2), 16);
  const g = parseInt(bgColor.substr(2, 2), 16);
  const b = parseInt(bgColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? colors.black : colors.white;
};
