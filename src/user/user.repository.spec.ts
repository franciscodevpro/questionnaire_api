import { PrismaService } from '../prisma.service';
import { UserRepository } from './user.repository';

type SutType = {
  sut: UserRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new UserRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('UserRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.user, 'create')
        .mockImplementation();
      const sut = new UserRepository(prismaServiceStub);
      await sut.create({
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
      expect(createSpy).toBeCalledWith({
        data: {
          name: 'any_name',
          password: 'any_password',
          login: 'any_login',
          isActive: true,
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.user, 'findMany')
        .mockImplementation();
      await sut.findAll();
      expect(findManySpy).toBeCalledWith({ where: { isActive: true } });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.user, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({ where: { id: 'any_id' } });
    });
  });

  describe('#findOneByLogin', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstSpy = jest
        .spyOn(prismaServiceStub.user, 'findFirst')
        .mockImplementation();
      await sut.findOneByLogin('any_login');
      expect(findFirstSpy).toBeCalledWith({
        where: { login: 'any_login' },
      });
    });
  });

  describe('#findOneByToken', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.user, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOneByToken('any_token');
      expect(findFirstOrThrowSpy).toBeCalledWith({
        where: { token: 'any_token' },
      });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.user, 'update')
        .mockImplementation();
      await sut.update('any_id', {
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          name: 'any_name',
          password: 'any_password',
          login: 'any_login',
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.user, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
