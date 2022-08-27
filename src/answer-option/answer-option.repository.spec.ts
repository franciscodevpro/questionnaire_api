import { AnswerOptionRepository } from './answer-option.repository';
import { PrismaService } from '../prisma.service';

type SutType = {
  sut: AnswerOptionRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new AnswerOptionRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('AnswerOptionRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.answerOption, 'create')
        .mockImplementation();
      const sut = new AnswerOptionRepository(prismaServiceStub);
      await sut.create({
        idQuestion: 'any_idQuestion',
        title: 'any_title',
        status: true,
      });
      expect(createSpy).toBeCalledWith({
        data: {
          idQuestion: 'any_idQuestion',
          title: 'any_title',
          status: true,
          isActive: true,
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.answerOption, 'findMany')
        .mockImplementation();
      await sut.findAll('any_idQuestion');
      expect(findManySpy).toBeCalledWith({
        where: { idQuestion: 'any_idQuestion', isActive: true },
      });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.answerOption, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({
        where: { id: 'any_id' },
      });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.answerOption, 'update')
        .mockImplementation();
      await sut.update('any_id', {
        idQuestion: 'any_idQuestion',
        title: 'any_title',
        status: true,
      });
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          idQuestion: 'any_idQuestion',
          title: 'any_title',
          status: true,
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.answerOption, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
