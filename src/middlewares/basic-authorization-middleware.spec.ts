import { NextFunction, Request, Response } from 'express';
import { ApplierRepository } from 'src/applier/applier.repository';
import { DeviceRepository } from 'src/device/device.repository';
import { BasicAuthorizationMiddleware } from './basic-authorization-middleware';
import * as Auth from '../helpers/auth';

const makeReqResNext = (): [Request, Response, NextFunction] => {
  const req = {
    authError: true,
    headers: { authorization: 'any_bearer YW55X3VzZXI6YW55X3Bhc3N3b3Jk' },
  } as any;
  const res = null;
  const next = () => 'any_next';
  return [req, res, next];
};

type SutTypes = {
  sut: BasicAuthorizationMiddleware;
  deviceRepositoryStub: DeviceRepository;
  applierRepositoryStub: ApplierRepository;
};

const makeSut = (): SutTypes => {
  const deviceRepositoryStub = {
    findOneByPin: (pin: string) => ({}),
  } as any;

  const applierRepositoryStub = {
    findOne: (any_applierId: string) => ({}),
  } as any;
  const sut = new BasicAuthorizationMiddleware(
    deviceRepositoryStub,
    applierRepositoryStub,
  );

  return { sut, deviceRepositoryStub, applierRepositoryStub };
};

describe('BasicAuthorizationMiddleware', () => {
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

    it('Should return next if applierId be null', async () => {
      const { sut } = makeSut();
      jest
        .spyOn(Auth, 'getBasicUserPassword')
        .mockReturnValueOnce([null, 'any_pin']);
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });

    it('Should return next if pin be null', async () => {
      const { sut } = makeSut();
      jest
        .spyOn(Auth, 'getBasicUserPassword')
        .mockReturnValueOnce(['any_applierId', null]);
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });

    it('Should return next if applier be null', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      jest.spyOn(applierRepositoryStub, 'findOne').mockReturnValueOnce(null);
      const result = await sut.use(...makeReqResNext());

      expect(result).toEqual('any_next');
    });

    it('Should return next if device be null', async () => {
      const { sut, deviceRepositoryStub } = makeSut();
      jest
        .spyOn(deviceRepositoryStub, 'findOneByPin')
        .mockReturnValueOnce(null);
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
