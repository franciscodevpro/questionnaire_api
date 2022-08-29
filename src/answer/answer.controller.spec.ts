import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AnswerController } from './answer.controller';
import { AnswerRepository } from './answer.repository';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

type SutType = {
  sut: AnswerController;
  answerServiceStub: AnswerService;
};

const makeSut = (): SutType => {
  class AnswerServiceStub {
    async create(idQuestionnaireData: string, data: CreateAnswerDto) {
      Promise.resolve();
    }

    async findAll(idQuestionnaireData: string) {
      return Promise.resolve([{}]);
    }

    async findOne(id: string) {
      return Promise.resolve({});
    }

    async update(id: string, updateAnswerDto: UpdateAnswerDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const answerServiceStub = new AnswerServiceStub() as AnswerService;
  const sut = new AnswerController(answerServiceStub);

  return { sut, answerServiceStub };
};

describe('AnswerController', () => {
  let controller: AnswerController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [PrismaService, AnswerService, AnswerRepository],
    }).compile();

    controller = module.get<AnswerController>(AnswerController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, answerServiceStub } = makeSut();
      const createSpy = jest.spyOn(answerServiceStub, 'create');
      await sut.create('any_idQuestionnaireData', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdA: 'any_createdA',
      });
      expect(createSpy).toBeCalledWith('any_idQuestionnaireData', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdA: 'any_createdA',
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, answerServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(answerServiceStub, 'findAll');
      await sut.findAll('any_idQuestionnaireData');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, answerServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(answerServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, answerServiceStub } = makeSut();
      const updateSpy = jest.spyOn(answerServiceStub, 'update');
      await sut.update('any_id', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdA: 'any_createdA',
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdA: 'any_createdA',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, answerServiceStub } = makeSut();
      const removeSpy = jest.spyOn(answerServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
