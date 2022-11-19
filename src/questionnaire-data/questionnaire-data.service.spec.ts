import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';
import { QuestionnaireDataService } from './questionnaire-data.service';

type SutType = {
  sut: QuestionnaireDataService;
  questionnaireDataRepositoryStub: QuestionnaireDataRepository;
};

const makeSut = (): SutType => {
  class QuestionnaireDataRepositoryStub {
    async create(data: CreateQuestionnaireDataDto) {
      Promise.resolve();
    }

    async findAll() {
      return Promise.resolve([{}]);
    }

    async findOne(id: string) {
      return Promise.resolve({});
    }

    async update(
      id: string,
      updateQuestionnaireDto: UpdateQuestionnaireDataDto,
    ) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const questionnaireDataRepositoryStub =
    new QuestionnaireDataRepositoryStub() as QuestionnaireDataRepository | any;
  const sut = new QuestionnaireDataService(questionnaireDataRepositoryStub);

  return { sut, questionnaireDataRepositoryStub };
};

describe('QuestionnaireDataService', () => {
  let service: QuestionnaireDataService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        QuestionnaireDataService,
        QuestionnaireDataRepository,
      ],
    }).compile();

    service = module.get<QuestionnaireDataService>(QuestionnaireDataService);
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(questionnaireDataRepositoryStub, 'create');
      await sut.create('any_idQuestionnaire', {
        idApplier: 'any_idApplier',
        idDevice: 'any_idDevice',
        audioPath: 'any_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
        createdAt: 'any_datetime',
      });
      expect(createSpy).toBeCalledWith({
        idQuestionnaire: 'any_idQuestionnaire',
        idApplier: 'any_idApplier',
        idDevice: 'any_idDevice',
        audioPath: 'any_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
        createdAt: 'any_datetime',
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(questionnaireDataRepositoryStub, 'findAll');
      await sut.findAll('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(questionnaireDataRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(questionnaireDataRepositoryStub, 'update');
      await sut.update('any_id', {
        idQuestionnaire: 'other_idQuestionnaire',
        idApplier: 'other_idApplier',
        idDevice: 'other_idDevice',
        audioPath: 'other_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
        createdAt: 'any_datetime',
      });

      expect(updateSpy).toBeCalledWith('any_id', {
        idQuestionnaire: 'other_idQuestionnaire',
        idApplier: 'other_idApplier',
        idDevice: 'other_idDevice',
        audioPath: 'other_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
        createdAt: 'any_datetime',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, questionnaireDataRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(questionnaireDataRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
