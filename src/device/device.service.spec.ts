import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { DeviceRepository } from './device.repository';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

type SutType = {
  sut: DeviceService;
  deviceRepositoryStub: DeviceRepository;
};

const makeSut = (): SutType => {
  class DeviceRepositoryStub {
    async create(data: CreateDeviceDto) {
      return Promise.resolve({});
    }

    async findAll() {
      return Promise.resolve([
        { id: 'any_id', name: 'any_name', pin: 'any_pid', isActive: true },
      ]);
    }

    async findOne(id: string) {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        pin: 'any_pid',
        isActive: true,
      });
    }

    async update(id: string, updateDeviceDto: UpdateDeviceDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const deviceRepositoryStub = new DeviceRepositoryStub() as DeviceRepository;
  const sut = new DeviceService(deviceRepositoryStub);

  return { sut, deviceRepositoryStub };
};

describe('DeviceService', () => {
  let service: DeviceService;

  it.skip('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, DeviceService, DeviceRepository],
    }).compile();

    service = module.get<DeviceService>(DeviceService);

    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, deviceRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(deviceRepositoryStub, 'create');
      await sut.create({ name: 'any_name', pin: 'any_pid' });
      expect(createSpy).toBeCalledWith({ name: 'any_name', pin: 'any_pid' });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, deviceRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(deviceRepositoryStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, deviceRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(deviceRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, deviceRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(deviceRepositoryStub, 'update');
      await sut.update('any_id', { name: 'other_name', pin: 'other_pid' });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'other_name',
        pin: 'other_pid',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, deviceRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(deviceRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
