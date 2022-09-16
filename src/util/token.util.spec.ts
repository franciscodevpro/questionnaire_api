import * as crypto from 'crypto';
import { TokenUtil } from './token.util';

type SutType = {
  sut: TokenUtil;
};

const makeSut = (): SutType => {
  const sut = new TokenUtil();

  return { sut };
};

describe('TokenUtil', () => {
  describe('generateToken', () => {
    it('Should return a token on success', () => {
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('any_randomUUID');
      jest.spyOn(Date, 'now').mockReturnValueOnce(0);
      const { sut } = makeSut();
      const result = sut.generateToken();
      expect(result).toEqual({
        token: 'any_randomUUID',
        tokenExpiration: 1800000,
      });
    });
  });
});
