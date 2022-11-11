import { PrismaService } from '../prisma.service';
import { QuestionRepository } from './question.repository';

type SutType = {
  sut: QuestionRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new QuestionRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('QuestionRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.question, 'create')
        .mockImplementation();
      const sut = new QuestionRepository(prismaServiceStub);
      await sut.create({
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
      expect(createSpy).toBeCalledWith({
        data: {
          idQuestionnaire: 'any_idQuestionnaire',
          title: 'any_title',
          variable: 'any_variable',
          type: 'any_type',
          minAnswers: 1,
          maxAnswers: 1,
          defaultValue: 'any_defaultValue',
          shuffle: true,
          prioritizeBySelection: true,
          isActive: true,
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.question, 'findMany')
        .mockImplementation();
      await sut.findAll('any_idQuestionnaire');
      expect(findManySpy).toBeCalledWith({
        where: { idQuestionnaire: 'any_idQuestionnaire', isActive: true },
        include: { answerOptions: { where: { isActive: true } } },
      });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.question, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({
        where: { id: 'any_id' },
        include: { answerOptions: { where: { isActive: true } } },
      });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.question, 'update')
        .mockImplementation();
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
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          idQuestionnaire: 'other_idQuestionnaire',
          title: 'other_title',
          variable: 'other_variable',
          type: 'other_type',
          minAnswers: 1,
          maxAnswers: 1,
          defaultValue: 'other_defaultValue',
          shuffle: true,
          prioritizeBySelection: true,
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.question, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
