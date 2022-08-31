import { PasswordUtil } from './password.util';

type SutType = {
  sut: PasswordUtil;
};

const makeSut = (): SutType => {
  const sut = new PasswordUtil();

  return { sut };
};

describe('PasswordUtil', () => {
  describe('comparePassword', () => {
    it('Should return true if password be equals', () => {
      const { sut } = makeSut();
      const result = sut.comparePassword('any_password', 'any_password');
      expect(result).toBeTruthy();
    });
  });

  describe('encryptPassword', () => {
    it('Should return an encrypted password', () => {
      const { sut } = makeSut();
      const result = sut.encryptPassword('any_password');
      expect(result).toBe('any_password');
    });
  });
});
