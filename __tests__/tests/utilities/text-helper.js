import { emojifyText, abbreviateNumber } from 'utils';
import sinon from 'sinon';
import emoji from 'node-emoji';

describe('Text Helper', () => {
  describe('emojifyText', () => {
    it('should call correcly with text params', () => {
      const emojify = sinon.spy(emoji, 'emojify');
      const input = 'I need more :coffee';
      emojifyText(input);
      expect(emojify.calledWith(input)).toEqual(true);
    });
  });

  describe('abbreviateNumber', () => {
    it('should get 1 when give 1', () => {
      const input = 1;
      const expected = 1;
      const result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });

    it('should get 1k when give 1000', () => {
      const input = 1000;
      const expected = '1k';
      const result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });

    it('should get 1.1k when give 1100', () => {
      const input = 1100;
      const expected = '1.1k';
      const result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });

    it('should get 96.2k when give 96234', () => {
      const input = 96234;
      const expected = '96.2k';
      const result = abbreviateNumber(input);
      expect(result).toEqual(expected);
    });
  });
});
