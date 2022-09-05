import { PasswordUtil } from './password.util';
import * as bcrypt from 'bcrypt';

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

  describe('hashPassword', () => {
    it('Should return an hashed password', async () => {
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('any_hashedPassword');
      const { sut } = makeSut();
      const result = await sut.hashPassword('any_password');
      expect(result).toBe('any_hashedPassword');
    });
  });
});
