import { ApplierRepository } from './applier.repository';
import { PrismaService } from '../prisma.service';

type SutType = {
  sut: ApplierRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new ApplierRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('ApplierRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.applier, 'create')
        .mockImplementation();
      const sut = new ApplierRepository(prismaServiceStub);
      await sut.create({ name: 'any_name' });
      expect(createSpy).toBeCalledWith({
        data: {
          name: 'any_name',
          isActive: true,
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.applier, 'findMany')
        .mockImplementation();
      await sut.findAll();
      expect(findManySpy).toBeCalledWith({ where: { isActive: true } });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.applier, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({ where: { id: 'any_id' } });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.applier, 'update')
        .mockImplementation();
      await sut.update('any_id', { name: 'any_name' });
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          name: 'any_name',
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.applier, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
