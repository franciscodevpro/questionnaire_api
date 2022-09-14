import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AnswerRepository } from './answer.repository';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

type SutType = {
  sut: AnswerService;
  applierRepositoryStub: AnswerRepository;
};

const makeSut = (): SutType => {
  class AnswerRepositoryStub {
    async create(data: CreateAnswerDto) {
      return Promise.resolve({});
    }

    async findAll(idQuestionnaireData: string) {
      return Promise.resolve([{}]);
    }

    async findOne(id: string) {
      return Promise.resolve({});
    }

    async update(id: string, data: UpdateAnswerDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const applierRepositoryStub = new AnswerRepositoryStub() as AnswerRepository;
  const sut = new AnswerService(applierRepositoryStub);

  return { sut, applierRepositoryStub };
};

describe('AnswerService', () => {
  let service: AnswerService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AnswerService, AnswerRepository],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(applierRepositoryStub, 'create');
      await sut.create('any_idQuestionnaireData', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
      });
      expect(createSpy).toBeCalledWith({
        idQuestionnaireData: 'any_idQuestionnaireData',
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, applierRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(applierRepositoryStub, 'findAll');
      await sut.findAll('any_idQuestionnaireData');
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
      await sut.update('any_id', {
        idQuestionnaireData: 'any_idQuestionnaireData',
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        idQuestionnaireData: 'any_idQuestionnaireData',
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
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
