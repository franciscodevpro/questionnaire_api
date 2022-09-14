import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { ApplierRepository } from './applier.repository';
import { ApplierService } from './applier.service';
import { CreateApplierDto } from './dto/create-applier.dto';
import { UpdateApplierDto } from './dto/update-applier.dto';

type SutType = {
  sut: ApplierService;
  applierRepositoryStub: ApplierRepository;
};

const makeSut = (): SutType => {
  class ApplierRepositoryStub {
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

    async update(id: string, data: UpdateApplierDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const applierRepositoryStub =
    new ApplierRepositoryStub() as ApplierRepository;
  const sut = new ApplierService(applierRepositoryStub);

  return { sut, applierRepositoryStub };
};

describe('ApplierService', () => {
  let service: ApplierService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ApplierService, ApplierRepository],
    }).compile();

    service = module.get<ApplierService>(ApplierService);
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(applierRepositoryStub, 'create');
      await sut.create({ name: 'any_name' });
      expect(createSpy).toBeCalledWith({ name: 'any_name' });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(applierRepositoryStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(applierRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(applierRepositoryStub, 'update');
      await sut.update('any_id', { name: 'other_name' });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'other_name',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(applierRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
