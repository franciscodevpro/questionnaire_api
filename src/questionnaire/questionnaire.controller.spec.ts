import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireService } from './questionnaire.service';

type SutType = {
  sut: QuestionnaireController;
  questionnaireServiceStub: QuestionnaireService;
};

const makeSut = (): SutType => {
  class QuestionnaireServiceStub {
    async create(data: CreateQuestionnaireDto) {
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

    async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const questionnaireServiceStub = new QuestionnaireServiceStub() as
    | QuestionnaireService
    | any;
  const sut = new QuestionnaireController(questionnaireServiceStub);

  return { sut, questionnaireServiceStub };
};

describe('QuestionnaireController', () => {
  let controller: QuestionnaireController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireController],
      providers: [PrismaService, QuestionnaireService, QuestionnaireRepository],
    }).compile();

    controller = module.get<QuestionnaireController>(QuestionnaireController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, questionnaireServiceStub } = makeSut();
      const createSpy = jest.spyOn(questionnaireServiceStub, 'create');
      await sut.create({
        name: 'any_name',
        image: 'any_image',
        quantity: 1,
        endDate: 'any_endDate',
        link: 'any_link',
        exceedsQuantity: true,
        canBeOnline: true,
        deviceIds: ['any_deviceId'],
        applierIds: ['any_applierId'],
      });
      expect(createSpy).toBeCalledWith({
        name: 'any_name',
        image: 'any_image',
        quantity: 1,
        endDate: 'any_endDate',
        link: 'any_link',
        exceedsQuantity: true,
        canBeOnline: true,
        deviceIds: ['any_deviceId'],
        applierIds: ['any_applierId'],
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, questionnaireServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(questionnaireServiceStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, questionnaireServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(questionnaireServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, questionnaireServiceStub } = makeSut();
      const updateSpy = jest.spyOn(questionnaireServiceStub, 'update');
      await sut.update('any_id', {
        name: 'other_name',
        image: 'other_image',
        quantity: 1,
        endDate: 'other_endDate',
        link: 'other_link',
        exceedsQuantity: true,
        canBeOnline: true,
        deviceIds: ['other_deviceId'],
        applierIds: ['other_applierId'],
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'other_name',
        image: 'other_image',
        quantity: 1,
        endDate: 'other_endDate',
        link: 'other_link',
        exceedsQuantity: true,
        canBeOnline: true,
        deviceIds: ['other_deviceId'],
        applierIds: ['other_applierId'],
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, questionnaireServiceStub } = makeSut();
      const removeSpy = jest.spyOn(questionnaireServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
