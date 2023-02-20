import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnswerRepository } from '../answer/answer.repository';
import { AnswerService } from '../answer/answer.service';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';
import { QuestionnaireDataController } from './questionnaire-data.controller';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';
import { QuestionnaireDataService } from './questionnaire-data.service';

type SutType = {
  sut: QuestionnaireDataController;
  questionnaireDataServiceStub: QuestionnaireDataService;
  answerServiceStub: AnswerService;
};

const makeSut = (): SutType => {
  class QuestionnaireDataServiceStub {
    async create(idQuestionnaire: string, data: CreateQuestionnaireDataDto) {
      return Promise.resolve({ id: 'any_idQuestionnaireData' });
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
  class AnswerServiceStub {
    async create(idQuestionnaire: string, data: CreateAnswerDto) {
      Promise.resolve();
    }
  }
  const questionnaireDataServiceStub = new QuestionnaireDataServiceStub() as
    | QuestionnaireDataService
    | any;
  const answerServiceStub = new AnswerServiceStub() as AnswerService | any;
  const sut = new QuestionnaireDataController(
    questionnaireDataServiceStub,
    answerServiceStub,
  );

  return { sut, questionnaireDataServiceStub, answerServiceStub };
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
        AnswerService,
        AnswerRepository,
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
      await sut.create(
        {
          applier: { id: 'any_idApplier' },
          device: { id: 'any_idDevice' },
        } as any,
        'any_idQuestionnaire',
        {
          audioPath: 'any_audioPath',
          lat: 'any_lat',
          lon: 'any_lon',
          duration: 1,
        } as any,
      );
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

  describe('#createMultiple', () => {
    it('should throw a bad request error case questionnaire data be null', async () => {
      const { sut } = makeSut();

      await expect(
        sut.createMultiple(
          {
            applier: { id: 'any_idApplier' },
            device: { id: 'any_idDevice' },
          } as any,
          'any_idQuestionnaire',
          null,
        )
      ).rejects.toStrictEqual(
        new HttpException(
          'No data received to register response', HttpStatus.BAD_REQUEST
        ),
      );
    });

    it('should throw a internal server error in case of error in questionnaire data creation', async () => {
      const { sut, questionnaireDataServiceStub } = makeSut();

      jest.spyOn(questionnaireDataServiceStub, 'create').mockReturnValue(null);

      await expect(
        sut.createMultiple(
          {
            applier: { id: 'any_idApplier' },
            device: { id: 'any_idDevice' },
          } as any,
          'any_idQuestionnaire',
          [
            {
              questionnaireData: {
                idQuestionnaire: 'any_idQuestionnaire',
                idApplier: 'any_idApplier',
                idDevice: 'any_idDevice',
                audioPath: 'any_audioPath',
                lat: 'any_lat',
                lon: 'any_lon',
                duration: 1,
                createdAt: 'any_date',
              },
              answers: [
                {
                  idQuestion: 'any_idQuestion',
                  idAnswerOption: 'any_idAnswerOption',
                  value: 'any_value',
                  duration: 1,
                  createdAt: 'any_createdAt',
                },
              ],
            },
          ],
        )
      ).rejects.toStrictEqual(
        new HttpException(
          'Data could not be registered', HttpStatus.INTERNAL_SERVER_ERROR
        ),
      );
    });

    it('should call repository', async () => {
      const { sut, questionnaireDataServiceStub, answerServiceStub } =
        makeSut();
      const createSpy = jest.spyOn(questionnaireDataServiceStub, 'create');
      const createAnswerSpy = jest.spyOn(answerServiceStub, 'create');
      await sut.createMultiple(
        {
          applier: { id: 'any_idApplier' },
          device: { id: 'any_idDevice' },
        } as any,
        'any_idQuestionnaire',
        [
          {
            questionnaireData: {
              idQuestionnaire: 'any_idQuestionnaire',
              idApplier: 'any_idApplier',
              idDevice: 'any_idDevice',
              audioPath: 'any_audioPath',
              lat: 'any_lat',
              lon: 'any_lon',
              duration: 1,
              createdAt: 'any_date',
            },
            answers: [
              {
                idQuestion: 'any_idQuestion',
                idAnswerOption: 'any_idAnswerOption',
                value: 'any_value',
                duration: 1,
                createdAt: 'any_createdAt',
              },
            ],
          },
        ],
      );
      expect(createSpy).toBeCalledWith('any_idQuestionnaire', {
        idApplier: 'any_idApplier',
        idDevice: 'any_idDevice',
        idQuestionnaire: 'any_idQuestionnaire',
        audioPath: 'any_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
        createdAt: 'any_date',
      });
      expect(createAnswerSpy).toBeCalledWith('any_idQuestionnaireData', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
        idQuestionnaireData: 'any_idQuestionnaireData',
      });
    });

    it('should iterate in each answer option if it be an array', async () => {
      const { sut, answerServiceStub } = makeSut();
      const createAnswerSpy = jest.spyOn(answerServiceStub, 'create');
      await sut.createMultiple(
        {
          applier: { id: 'any_idApplier' },
          device: { id: 'any_idDevice' },
        } as any,
        'any_idQuestionnaire',
        [
          {
            questionnaireData: {
              idQuestionnaire: 'any_idQuestionnaire',
              idApplier: 'any_idApplier',
              idDevice: 'any_idDevice',
              audioPath: 'any_audioPath',
              lat: 'any_lat',
              lon: 'any_lon',
              duration: 1,
              createdAt: 'any_date',
            },
            answers: [
              {
                idQuestion: 'any_idQuestion',
                idAnswerOption: null,
                idAnswerOptions: ['any_idAnswerOption', 'any_idAnswerOption'],
                value: 'any_value',
                duration: 1,
                createdAt: 'any_createdAt',
              },
            ],
          },
        ],
      );

      expect(createAnswerSpy).toBeCalledTimes(2);
      expect(createAnswerSpy).toBeCalledWith('any_idQuestionnaireData', {
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
        idQuestionnaireData: 'any_idQuestionnaireData',
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
