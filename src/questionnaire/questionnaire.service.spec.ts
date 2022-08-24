import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireService } from './questionnaire.service';

type SutType = {
  sut: QuestionnaireService;
  questionnaireRepositoryStub: QuestionnaireRepository;
};

const makeSut = (): SutType => {
  class QuestionnaireRepositoryStub {
    async create(data: CreateQuestionnaireDto) {
      Promise.resolve();
    }

    async findAll() {
      return Promise.resolve([
        {
          id: 'any_id',
          name: 'any_name',
          image: 'any_image',
          quantity: 1,
          endDate: 'any_endDate',
          link: 'any_link',
          exceedsQuantity: true,
          canBeOnline: true,
          deviceIds: ['any_deviceId'],
          applierIds: ['any_applierId'],
          isActive: true,
        },
      ]);
    }

    async findOne(id: string) {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        image: 'any_image',
        quantity: 1,
        endDate: 'any_endDate',
        link: 'any_link',
        exceedsQuantity: true,
        canBeOnline: true,
        deviceIds: ['any_deviceId'],
        applierIds: ['any_applierId'],
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
  const questionnaireRepositoryStub = new QuestionnaireRepositoryStub() as
    | QuestionnaireRepository
    | any;
  const sut = new QuestionnaireService(questionnaireRepositoryStub);

  return { sut, questionnaireRepositoryStub };
};

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, QuestionnaireService, QuestionnaireRepository],
    }).compile();

    service = module.get<QuestionnaireService>(QuestionnaireService);
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, questionnaireRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(questionnaireRepositoryStub, 'create');
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
      const { sut, questionnaireRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(questionnaireRepositoryStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, questionnaireRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(questionnaireRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, questionnaireRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(questionnaireRepositoryStub, 'update');
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
      const { sut, questionnaireRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(questionnaireRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
