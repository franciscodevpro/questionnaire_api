import { httpForbiddenError, httpUnauthorizedError } from './errors';

describe('Auth', () => {
  describe('#httpUnauthorizedError', () => {
    it('should return unauthorized error', async () => {
      const errorValue = httpUnauthorizedError();
      expect(errorValue).toEqual({
        error: 'unauthorized error',
      });
    });
  });

  describe('#httpForbiddenError', () => {
    it('should return forbidden error', async () => {
      const errorValue = httpForbiddenError();
      expect(errorValue).toEqual({
        error: 'forbidden error',
      });
    });
  });
});
