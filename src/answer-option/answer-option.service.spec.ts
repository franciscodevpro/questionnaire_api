import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AnswerOptionRepository } from './answer-option.repository';
import { AnswerOptionService } from './answer-option.service';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer-option.dto';

type SutType = {
  sut: AnswerOptionService;
  answerOptionRepositoryStub: AnswerOptionRepository;
};

const makeSut = (): SutType => {
  class AnswerOptionRepositoryStub {
    async create(idAnswerOption: string, data: CreateAnswerOptionDto) {
      Promise.resolve();
    }

    async findAll(idAnswerOption: string) {
      return Promise.resolve([{}]);
    }

    async findOne(id: string) {
      return Promise.resolve({});
    }

    async update(id: string, updateAnswerOptionDto: UpdateAnswerOptionDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const answerOptionRepositoryStub = new AnswerOptionRepositoryStub() as
    | AnswerOptionRepository
    | any;
  const sut = new AnswerOptionService(answerOptionRepositoryStub);

  return { sut, answerOptionRepositoryStub };
};

describe('AnswerOptionService', () => {
  let service: AnswerOptionService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AnswerOptionService, AnswerOptionRepository],
    }).compile();

    service = module.get<AnswerOptionService>(AnswerOptionService);
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, answerOptionRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(answerOptionRepositoryStub, 'create');
      await sut.create('any_idQuestion', {
        title: 'any_title',
        status: true,
      });
      expect(createSpy).toBeCalledWith({
        idQuestion: 'any_idQuestion',
        title: 'any_title',
        status: true,
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, answerOptionRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(answerOptionRepositoryStub, 'findAll');
      await sut.findAll('any_idQuestion');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, answerOptionRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(answerOptionRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, answerOptionRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(answerOptionRepositoryStub, 'update');
      await sut.update('any_id', {
        idQuestion: 'any_idQuestion',
        title: 'any_title',
        status: true,
      });

      expect(updateSpy).toBeCalledWith('any_id', {
        idQuestion: 'any_idQuestion',
        title: 'any_title',
        status: true,
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, answerOptionRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(answerOptionRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
