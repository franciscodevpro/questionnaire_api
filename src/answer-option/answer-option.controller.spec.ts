import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { AnswerOptionController } from './answer-option.controller';
import { AnswerOptionRepository } from './answer-option.repository';
import { AnswerOptionService } from './answer-option.service';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer-option.dto';

type SutType = {
  sut: AnswerOptionController;
  answerOptionServiceStub: AnswerOptionService;
};

const makeSut = (): SutType => {
  class AnswerOptionServiceStub {
    async create(data: CreateAnswerOptionDto) {
      Promise.resolve();
    }

    async findAll() {
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
  const answerOptionServiceStub = new AnswerOptionServiceStub() as
    | AnswerOptionService
    | any;
  const sut = new AnswerOptionController(answerOptionServiceStub);

  return { sut, answerOptionServiceStub };
};

describe('AnswerOptionController', () => {
  let controller: AnswerOptionController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerOptionController],
      providers: [PrismaService, AnswerOptionService, AnswerOptionRepository],
    }).compile();

    controller = module.get<AnswerOptionController>(AnswerOptionController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, answerOptionServiceStub } = makeSut();
      const createSpy = jest.spyOn(answerOptionServiceStub, 'create');
      await sut.create('any_idQuestion', {
        title: 'any_title',
        status: true,
      });
      expect(createSpy).toBeCalledWith('any_idQuestion', {
        title: 'any_title',
        status: true,
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, answerOptionServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(answerOptionServiceStub, 'findAll');
      await sut.findAll('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, answerOptionServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(answerOptionServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, answerOptionServiceStub } = makeSut();
      const updateSpy = jest.spyOn(answerOptionServiceStub, 'update');
      await sut.update('any_id', {
        idQuestion: 'other_idQuestion',
        title: 'any_title',
        status: true,
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        idQuestion: 'other_idQuestion',
        title: 'any_title',
        status: true,
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, answerOptionServiceStub } = makeSut();
      const removeSpy = jest.spyOn(answerOptionServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
