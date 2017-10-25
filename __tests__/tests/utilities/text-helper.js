import { emojifyText, abbreviateNumber } from 'utils';
import emoji from 'node-emoji';

describe('Text Helper', () => {
  describe('emojifyText', () => {
    it('should call correcly with text params', () => {
      const emojify = jest.spyOn(emoji, 'emojify');
      const input = 'I need more :coffee';

      emojifyText(input);

      expect(emojify).toBeCalledWith(input);

      emojify.mockReset();
      emojify.mockRestore();
    });
  });

  describe('abbreviateNumber', () => {
    it('should return 1 when given 1', () => {
      const input = 1;
      const expected = 1;
      const result = abbreviateNumber(input);

      expect(result).toEqual(expected);
    });

    it('should return 1k when given 1000', () => {
      const input = 1000;
      const expected = '1k';
      const result = abbreviateNumber(input);

      expect(result).toEqual(expected);
    });

    it('should return 1.1k when given 1100', () => {
      const input = 1100;
      const expected = '1.1k';
      const result = abbreviateNumber(input);

      expect(result).toEqual(expected);
    });

    it('should return 96.2k when given 96234', () => {
      const input = 96234;
      const expected = '96.2k';
      const result = abbreviateNumber(input);

      expect(result).toEqual(expected);
    });
  });
});
