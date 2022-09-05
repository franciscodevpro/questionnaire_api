import { NextFunction, Request, Response } from 'express';
import * as Auth from '../helpers/auth';
import { UserRepository } from '../user/user.repository';
import { BearerAuthorizationMiddleware } from '../middlewares/bearer-authorization-middleware';

const makeReqResNext = (): [Request, Response, NextFunction] => {
  const req = {
    authError: true,
    headers: { 'x-access-token': 'any_bearer any_token' },
  } as any;
  const res = null;
  const next = () => 'any_next';
  return [req, res, next];
};

type SutTypes = {
  sut: BearerAuthorizationMiddleware;
  userRepository: UserRepository;
};

const makeSut = (): SutTypes => {
  const userRepository = {
    findOneByToken: (token: string) => ({
      tokenExpiration: Date.now() + 180000,
    }),
  } as any;

  const sut = new BearerAuthorizationMiddleware(userRepository);

  return { sut, userRepository };
};

describe('BearerAuthorizationMiddleware', () => {
  describe('#use', () => {
    it('Should return next if authError be null', async () => {
      const { sut } = makeSut();
      let [req, res, next] = makeReqResNext();
      req['authError'] = null;
      const result = await sut.use(req, res, next);

      expect(result).toEqual('any_next');
    });

    it('Should return next if validateBearerValueStructure fails', async () => {
      const { sut } = makeSut();
      jest
        .spyOn(Auth, 'validateBearerValueStructure')
        .mockReturnValueOnce(false);
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });

    it('Should return next if user be null', async () => {
      const { sut, userRepository } = makeSut();
      jest.spyOn(userRepository, 'findOneByToken').mockReturnValueOnce(null);
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });

    it('Should return next token expired', async () => {
      const { sut, userRepository } = makeSut();
      jest
        .spyOn(userRepository, 'findOneByToken')
        .mockReturnValueOnce({ tokenExpiration: Date.now() - 1 } as any);
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });

    it('Should return next on success', async () => {
      const { sut } = makeSut();
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });
  });
});
