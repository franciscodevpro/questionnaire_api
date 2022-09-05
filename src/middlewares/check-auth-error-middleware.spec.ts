import { NextFunction, Request, Response } from 'express';
import { CheckAuthMiddleware } from './check-auth-error-middleware';

const makeReqResNext = (): [Request, Response, NextFunction] => {
  const req = {
    authError: null,
    headers: { authorization: 'any_bearer any_token' },
  } as any;
  const res = {
    json: (value: any) => ({
      status: (status: number) => ({ status, value }),
    }),
  } as any;
  const next = () => 'any_next';
  return [req, res, next];
};

type SutTypes = {
  sut: CheckAuthMiddleware;
};

const makeSut = (): SutTypes => {
  const sut = new CheckAuthMiddleware();

  return { sut };
};

describe('CheckAuthMiddleware', () => {
  describe('#use', () => {
    it('Should return res.json equals to authError if authError be not null', async () => {
      const { sut } = makeSut();
      let [req, res, next] = makeReqResNext();
      req['authError'] = true;
      const result = await sut.use(req, res, next);

      expect(result).toEqual({ status: 401, value: true });
    });

    it('Should return next on success', async () => {
      const { sut } = makeSut();
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });
  });
});
