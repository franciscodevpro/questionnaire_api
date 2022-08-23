import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { DeviceController } from './device.controller';
import { DeviceRepository } from './device.repository';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

type SutType = {
  sut: DeviceController;
  deviceServiceStub: DeviceService;
};

const makeSut = (): SutType => {
  class DeviceServiceStub {
    async create(data: CreateDeviceDto) {
      Promise.resolve();
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
  const deviceServiceStub = new DeviceServiceStub() as DeviceService;
  const sut = new DeviceController(deviceServiceStub);

  return { sut, deviceServiceStub };
};

describe('DeviceController', () => {
  let controller: DeviceController;

  it.skip('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [PrismaService, DeviceService, DeviceRepository],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, deviceServiceStub } = makeSut();
      const createSpy = jest.spyOn(deviceServiceStub, 'create');
      await sut.create({ name: 'any_name', pin: 'any_pid' });
      expect(createSpy).toBeCalledWith({ name: 'any_name', pin: 'any_pid' });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, deviceServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(deviceServiceStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, deviceServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(deviceServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, deviceServiceStub } = makeSut();
      const updateSpy = jest.spyOn(deviceServiceStub, 'update');
      await sut.update('any_id', { name: 'other_name', pin: 'other_pid' });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'other_name',
        pin: 'other_pid',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, deviceServiceStub } = makeSut();
      const removeSpy = jest.spyOn(deviceServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
