import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { ApplierController } from './applier.controller';
import { ApplierRepository } from './applier.repository';
import { ApplierService } from './applier.service';
import { CreateApplierDto } from './dto/create-applier.dto';
import { UpdateApplierDto } from './dto/update-applier.dto';

type SutType = {
  sut: ApplierController;
  applierServiceStub: ApplierService;
};

const makeSut = (): SutType => {
  class ApplierServiceStub {
    async create(data: CreateApplierDto) {
      return Promise.resolve({});
    }

    async findAll() {
      return Promise.resolve([
        { id: 'any_id', name: 'any_name', isActive: true },
      ]);
    }

    async findOne(id: string) {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        isActive: true,
      });
    }

    async update(id: string, updateApplierDto: UpdateApplierDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const applierServiceStub = new ApplierServiceStub() as ApplierService;
  const sut = new ApplierController(applierServiceStub);

  return { sut, applierServiceStub };
};

describe('ApplierController', () => {
  let controller: ApplierController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplierController],
      providers: [PrismaService, ApplierService, ApplierRepository],
    }).compile();

    controller = module.get<ApplierController>(ApplierController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, applierServiceStub } = makeSut();
      const createSpy = jest.spyOn(applierServiceStub, 'create');
      await sut.create({ name: 'any_name' });
      expect(createSpy).toBeCalledWith({ name: 'any_name' });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, applierServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(applierServiceStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, applierServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(applierServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, applierServiceStub } = makeSut();
      const updateSpy = jest.spyOn(applierServiceStub, 'update');
      await sut.update('any_id', { name: 'other_name' });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'other_name',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, applierServiceStub } = makeSut();
      const removeSpy = jest.spyOn(applierServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
