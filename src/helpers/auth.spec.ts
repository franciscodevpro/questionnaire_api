import * as Auth from './auth';

describe('Auth', () => {
  describe('#validateBearerValueStructure', () => {
    it('should return false if no value provided', async () => {
      const isValid = Auth.validateBearerValueStructure(null);
      expect(isValid).toBe(false);
    });
    it('should return false if no bearer returned', async () => {
      jest
        .spyOn(Auth, 'divideBearerValue')
        .mockReturnValueOnce([null, 'any_token']);
      const isValid = Auth.validateBearerValueStructure('any_bearer any_token');
      expect(isValid).toBe(false);
    });
    it('should return false if no token returned', async () => {
      jest
        .spyOn(Auth, 'divideBearerValue')
        .mockReturnValueOnce(['any_bearer', null]);
      const isValid = Auth.validateBearerValueStructure('any_bearer any_token');
      expect(isValid).toBe(false);
    });
    it('should return true on success', async () => {
      jest
        .spyOn(Auth, 'divideBearerValue')
        .mockReturnValueOnce(['any_bearer', 'any_token']);
      const isValid = Auth.validateBearerValueStructure('any_bearer any_token');
      expect(isValid).toBe(true);
    });
  });

  describe('#divideBearerValue', () => {
    it('should return an array with two positions on success', async () => {
      const arrayValue = Auth.divideBearerValue('any_bearer any_token');
      expect(arrayValue).toEqual(['any_bearer', 'any_token']);
    });
  });

  describe('#getBasicUserPassword', () => {
    it('should return an array with two positions on success', async () => {
      const base64Value = Buffer.from('anyUser:anyPassword').toString('base64');
      const arrayValue = Auth.getBasicUserPassword(base64Value);
      expect(arrayValue).toEqual(['anyUser', 'anyPassword']);
    });
  });
});
