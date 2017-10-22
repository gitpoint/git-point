import { emojifyText, abbreviateNumber } from 'utils';

describe('Text Helper', () => {
  describe('emojifyText', () => {
    it('should get correctly display :caffee: with emoji', () => {
      expected = 'I need more ☕️';
      result = emojifyText('I need more :coffee:');
      expect(result).toEqual(expected);
    });
  });

  describe('abbreviateNumber', () => {
    it('should get 1 when give 1', () => {
      input = 1;
      expected = 1;
      result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });

    it('should get 1k when give 1000', () => {
      input = 1000;
      expected = '1k';
      result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });

    it('should get 1.1k when give 1100', () => {
      input = 1100;
      expected = '1.1k';
      result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });
  });
});
