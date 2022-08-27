import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';

type SutType = {
  sut: QuestionService;
  questionRepositoryStub: QuestionRepository;
};

const makeSut = (): SutType => {
  class QuestionRepositoryStub {
    async create(idQuestionnaire: string, data: CreateQuestionDto) {
      Promise.resolve();
    }

    async findAll(idQuestionnaire: string) {
      return Promise.resolve([{}]);
    }

    async findOne(idQuestionnaire: string, id: string) {
      return Promise.resolve({});
    }

    async update(
      idQuestionnaire: string,
      id: string,
      updateQuestionDto: UpdateQuestionDto,
    ) {
      Promise.resolve();
    }

    async remove(idQuestionnaire: string, id: string) {
      Promise.resolve();
    }
  }
  const questionRepositoryStub = new QuestionRepositoryStub() as
    | QuestionRepository
    | any;
  const sut = new QuestionService(questionRepositoryStub);

  return { sut, questionRepositoryStub };
};

describe('QuestionService', () => {
  let service: QuestionService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, QuestionService, QuestionRepository],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, questionRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(questionRepositoryStub, 'create');
      await sut.create('any_idQuestionnaire', {
        title: 'any_title',
        variable: 'any_variable',
        type: 'any_type',
        minAnswers: 1,
        maxAnswers: 1,
        defaultValue: 'any_defaultValue',
        shuffle: true,
        prioritizeBySelection: true,
      });
      expect(createSpy).toBeCalledWith({
        idQuestionnaire: 'any_idQuestionnaire',
        title: 'any_title',
        variable: 'any_variable',
        type: 'any_type',
        minAnswers: 1,
        maxAnswers: 1,
        defaultValue: 'any_defaultValue',
        shuffle: true,
        prioritizeBySelection: true,
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, questionRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(questionRepositoryStub, 'findAll');
      await sut.findAll('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, questionRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(questionRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, questionRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(questionRepositoryStub, 'update');
      await sut.update('any_id', {
        idQuestionnaire: 'other_idQuestionnaire',
        title: 'other_title',
        variable: 'other_variable',
        type: 'other_type',
        minAnswers: 1,
        maxAnswers: 1,
        defaultValue: 'other_defaultValue',
        shuffle: true,
        prioritizeBySelection: true,
      });

      expect(updateSpy).toBeCalledWith('any_id', {
        idQuestionnaire: 'other_idQuestionnaire',
        title: 'other_title',
        variable: 'other_variable',
        type: 'other_type',
        minAnswers: 1,
        maxAnswers: 1,
        defaultValue: 'other_defaultValue',
        shuffle: true,
        prioritizeBySelection: true,
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, questionRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(questionRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
