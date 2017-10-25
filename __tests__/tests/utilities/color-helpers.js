import { getFontColorByBackground } from 'utils';

describe('Color Helpers', () => {
  it('should return a black font color for the light yellow background', () => {
    const lightYellowColor = 'e5f496';
    expect(getFontColorByBackground(lightYellowColor)).toBe('#000000');
  });

  it('should return a black font color for the light blue background', () => {
    const lightBlueColor = 'a9b3ff';
    expect(getFontColorByBackground(lightBlueColor)).toBe('#000000');
  });

  it('should return a black font color for the light red background', () => {
    const lightRedColor = 'f4ad96';
    expect(getFontColorByBackground(lightRedColor)).toBe('#000000');
  });

  it('should return a white font color for the dark green background', () => {
    const darkGreenColor = '288702';
    expect(getFontColorByBackground(darkGreenColor)).toBe('#ffffff');
  });

  it('should return a white font color for the dark blue background', () => {
    const darkBlueColor = '0800fd';
    expect(getFontColorByBackground(darkBlueColor)).toBe('#ffffff');
  });

  it('should return a white font color for the dark red background', () => {
    const darkRedColor = 'fd0000';
    expect(getFontColorByBackground(darkRedColor)).toBe('#ffffff');
  });
});
