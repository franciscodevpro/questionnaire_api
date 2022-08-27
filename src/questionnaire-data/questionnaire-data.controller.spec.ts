import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';
import { QuestionnaireDataController } from './questionnaire-data.controller';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';
import { QuestionnaireDataService } from './questionnaire-data.service';

type SutType = {
  sut: QuestionnaireDataController;
  questionnaireDataServiceStub: QuestionnaireDataService;
};

const makeSut = (): SutType => {
  class QuestionnaireDataServiceStub {
    async create(idQuestionnaire: string, data: CreateQuestionnaireDataDto) {
      Promise.resolve();
    }

    async findAll(idQuestionnaire: string) {
      return Promise.resolve([{}]);
    }

    async findOne(id: string) {
      return Promise.resolve({});
    }

    async update(
      id: string,
      updateQuestionnaireDataDto: UpdateQuestionnaireDataDto,
    ) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const questionnaireDataServiceStub = new QuestionnaireDataServiceStub() as
    | QuestionnaireDataService
    | any;
  const sut = new QuestionnaireDataController(questionnaireDataServiceStub);

  return { sut, questionnaireDataServiceStub };
};

describe('QuestionnaireDataController', () => {
  let controller: QuestionnaireDataController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireDataController],
      providers: [
        PrismaService,
        QuestionnaireDataService,
        QuestionnaireDataRepository,
      ],
    }).compile();

    controller = module.get<QuestionnaireDataController>(
      QuestionnaireDataController,
    );
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataServiceStub } = makeSut();
      const createSpy = jest.spyOn(questionnaireDataServiceStub, 'create');
      await sut.create('any_idQuestionnaire', {
        idApplier: 'any_idApplier',
        idDevice: 'any_idDevice',
        audioPath: 'any_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
      });
      expect(createSpy).toBeCalledWith('any_idQuestionnaire', {
        idApplier: 'any_idApplier',
        idDevice: 'any_idDevice',
        audioPath: 'any_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(questionnaireDataServiceStub, 'findAll');
      await sut.findAll('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(questionnaireDataServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataServiceStub } = makeSut();
      const updateSpy = jest.spyOn(questionnaireDataServiceStub, 'update');
      await sut.update('any_id', {
        idApplier: 'other_idApplier',
        idDevice: 'other_idDevice',
        audioPath: 'other_audioPath',
        lat: 'other_lat',
        lon: 'other_lon',
        duration: 1,
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        idApplier: 'other_idApplier',
        idDevice: 'other_idDevice',
        audioPath: 'other_audioPath',
        lat: 'other_lat',
        lon: 'other_lon',
        duration: 1,
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataServiceStub } = makeSut();
      const removeSpy = jest.spyOn(questionnaireDataServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
