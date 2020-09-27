import { v3 } from 'api';
import { open } from 'testData/api/pull-request';
import { notification } from 'testData/api/notification';

describe('API v3 test', () => {
  describe('v3 call', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(open),
        })
      );
    });

    it('should call fetch with the expected params', () => {
      const expectedUrl = 'https://api.github.com';
      const expectedParams = 'parameters';
      expect(global.fetch).not.toHaveBeenCalled();
      v3.call('https://api.github.com', 'parameters');
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedParams);
    });

    it('should return the expected response object', async () => {
      const expected = open;

      expect(v3.call('https://api.github.com', 'parameters')).resolves.toEqual(
        expected
      );
    });
  });

  describe('v3 parameters', () => {
    const accessToken = '12345abcdef98765432';

    it('should return the expected default params object', () => {
      const expected = {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token 12345abcdef98765432',
          'Cache-Control': 'no-cache',
        },
        method: 'GET',
      };

      expect(v3.parameters(accessToken)).toEqual(expected);
    });

    it('should return the expected params object when called with args', () => {
      const mercyPreview = 'application/vnd.github.mercy-preview+json';
      const body = {
        client_id: '1234',
        client_secret: 'abc1234',
        code: '001',
        state: 'state string',
      };
      const expected = {
        headers: {
          Accept: 'application/vnd.github.mercy-preview+json',
          Authorization: 'token 12345abcdef98765432',
          'Cache-Control': 'no-cache',
        },
        body:
          '{"client_id":"1234","client_secret":"abc1234","code":"001","state":"state string"}',
        method: 'POST',
      };

      expect(v3.parameters(accessToken, 'POST', mercyPreview, body)).toEqual(
        expected
      );
    });
  });

  describe('v3 count', () => {
    const accessToken = '12345abcdef98765432';

    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve([notification]),
          headers: {
            get: jest.fn().mockImplementation(() => null),
          },
        })
      );
    });

    it('should be called with expected url and accessToken params', () => {
      const expectedUrl = 'https://api.github.com?per_page=1';
      const expectedBody = v3.parameters(accessToken);
      v3.count('https://api.github.com', accessToken);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
    });

    it('should return number', async () => {
      expect(await v3.count('https://api.github.com', accessToken)).toEqual(1);
    });
  });

  describe('v3 delete', () => {
    const accessToken = '12345abcdef98765432';

    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve('successful response'),
        })
      );
    });

    it('should call fetch with the expected params', () => {
      const expectedUrl = 'https://api.github.com';
      const expected = {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token 12345abcdef98765432',
          'Cache-Control': 'no-cache',
        },
        method: 'DELETE',
      };

      expect(global.fetch).not.toHaveBeenCalled();

      v3.delete('https://api.github.com', accessToken);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expected);
    });

    it('should return expected response', () => {
      const expected = 'successful response';

      expect(v3.delete('https://api.github.com', accessToken)).resolves.toEqual(
        expected
      );
    });
  });
});
