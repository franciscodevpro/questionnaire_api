import { DeviceRepository } from './device.repository';
import { PrismaService } from '../prisma.service';

type SutType = {
  sut: DeviceRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new DeviceRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('DeviceRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.device, 'create')
        .mockImplementation();
      const sut = new DeviceRepository(prismaServiceStub);
      await sut.create({ name: 'any_name', pin: 'any_pid' });
      expect(createSpy).toBeCalledWith({
        data: {
          name: 'any_name',
          pin: 'any_pid',
          isActive: true,
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.device, 'findMany')
        .mockImplementation();
      await sut.findAll();
      expect(findManySpy).toBeCalledWith({ where: { isActive: true } });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.device, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({ where: { id: 'any_id' } });
    });
  });

  describe('#findOneByPin', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.device, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOneByPin('any_pin');
      expect(findFirstOrThrowSpy).toBeCalledWith({ where: { pin: 'any_pin' } });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.device, 'update')
        .mockImplementation();
      await sut.update('any_id', { name: 'any_name', pin: 'any_pid' });
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          name: 'any_name',
          pin: 'any_pid',
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.device, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
