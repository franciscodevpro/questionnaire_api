import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';

type SutType = {
  sut: QuestionController;
  questionServiceStub: QuestionService;
};

const makeSut = (): SutType => {
  class QuestionServiceStub {
    async create(data: CreateQuestionDto) {
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

    async update(id: string, updateQuestionDto: UpdateQuestionDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const questionServiceStub = new QuestionServiceStub() as
    | QuestionService
    | any;
  const sut = new QuestionController(questionServiceStub);

  return { sut, questionServiceStub };
};

describe('QuestionController', () => {
  let controller: QuestionController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [PrismaService, QuestionService, QuestionRepository],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, questionServiceStub } = makeSut();
      const createSpy = jest.spyOn(questionServiceStub, 'create');
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
      expect(createSpy).toBeCalledWith('any_idQuestionnaire', {
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
      const { sut, questionServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(questionServiceStub, 'findAll');
      await sut.findAll('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, questionServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(questionServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, questionServiceStub } = makeSut();
      const updateSpy = jest.spyOn(questionServiceStub, 'update');
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
      const { sut, questionServiceStub } = makeSut();
      const removeSpy = jest.spyOn(questionServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
