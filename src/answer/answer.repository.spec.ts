import { PrismaService } from '../prisma.service';
import { AnswerRepository } from './answer.repository';

type SutType = {
  sut: AnswerRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new AnswerRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('AnswerRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.answer, 'create')
        .mockImplementation();
      const sut = new AnswerRepository(prismaServiceStub);
      await sut.create({
        idQuestionnaireData: 'any_idQuestionnaireData',
        idQuestion: 'any_idQuestion',
        idAnswerOption: 'any_idAnswerOption',
        value: 'any_value',
        duration: 1,
        createdAt: 'any_createdAt',
      });
      expect(createSpy).toBeCalledWith({
        data: {
          idQuestionnaireData: 'any_idQuestionnaireData',
          idQuestion: 'any_idQuestion',
          idAnswerOption: 'any_idAnswerOption',
          value: 'any_value',
          duration: 1,
          createdAt: 'any_createdAt',
          isActive: true,
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.answer, 'findMany')
        .mockImplementation();
      await sut.findAll('any_idQuestionnaireData');
      expect(findManySpy).toBeCalledWith({
        where: {
          idQuestionnaireData: 'any_idQuestionnaireData',
          isActive: true,
        },
        include: { question: true, answerOption: true },
      });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.answer, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({
        where: { id: 'any_id' },
        include: { question: true, answerOption: true },
      });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.answer, 'update')
        .mockImplementation();
      await sut.update('any_id', {
        idQuestionnaireData: 'other_idQuestionnaireData',
        idQuestion: 'other_idQuestion',
        idAnswerOption: 'other_idAnswerOption',
        value: 'other_value',
        duration: 1,
        createdAt: 'other_createdAt',
      });
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          idQuestionnaireData: 'other_idQuestionnaireData',
          idQuestion: 'other_idQuestion',
          idAnswerOption: 'other_idAnswerOption',
          value: 'other_value',
          duration: 1,
          createdAt: 'other_createdAt',
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.answer, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
