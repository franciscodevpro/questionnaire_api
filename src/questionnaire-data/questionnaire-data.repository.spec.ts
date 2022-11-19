import { PrismaService } from '../prisma.service';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';

type SutType = {
  sut: QuestionnaireDataRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new QuestionnaireDataRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('QuestionnaireDataRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.questionnaireData, 'create')
        .mockImplementation();
      const sut = new QuestionnaireDataRepository(prismaServiceStub);
      await sut.create({
        idQuestionnaire: 'any_idQuestionnaire',
        idApplier: 'any_idApplier',
        idDevice: 'any_idDevice',
        audioPath: 'any_audioPath',
        lat: 'any_lat',
        lon: 'any_lon',
        duration: 1,
        createdAt: 'any_datetime',
      });
      expect(createSpy).toBeCalledWith({
        data: {
          idQuestionnaire: 'any_idQuestionnaire',
          idApplier: 'any_idApplier',
          idDevice: 'any_idDevice',
          audioPath: 'any_audioPath',
          lat: 'any_lat',
          lon: 'any_lon',
          duration: 1,
          isActive: true,
          createdAt: 'any_datetime',
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.questionnaireData, 'findMany')
        .mockImplementation();
      await sut.findAll('any_idQuestionnaire');
      expect(findManySpy).toBeCalledWith({
        where: { isActive: true, idQuestionnaire: 'any_idQuestionnaire' },
        include: { questionnaire: true, device: true, applier: true },
      });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.questionnaireData, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({
        where: { id: 'any_id' },
        include: { questionnaire: true, device: true, applier: true },
      });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.questionnaireData, 'update')
        .mockImplementation();
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
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          idQuestionnaire: 'other_idQuestionnaire',
          idApplier: 'other_idApplier',
          idDevice: 'other_idDevice',
          audioPath: 'other_audioPath',
          lat: 'any_lat',
          lon: 'any_lon',
          duration: 1,
          createdAt: 'any_datetime',
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.questionnaireData, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
