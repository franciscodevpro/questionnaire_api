import { PrismaService } from '../prisma.service';
import { ReportsRepository } from './reports.repository';

type SutType = {
  sut: ReportsRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new ReportsRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('ReportsRepository', () => {
  describe('#questionnaireData', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const questionnaireSpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'findFirstOrThrow')
        .mockImplementation();
      const questionnaireDataSpy = jest
        .spyOn(prismaServiceStub.questionnaireData, 'findMany')
        .mockImplementation(
          () => [{ id: 'any_id' }, { id: 'other_id' }] as any,
        );
      const questionSpy = jest
        .spyOn(prismaServiceStub.question, 'findMany')
        .mockImplementation();
      const answerSpy = jest
        .spyOn(prismaServiceStub.answer, 'findMany')
        .mockImplementation();
      await sut.questionnaireData('any_id');
      expect(questionnaireSpy).toBeCalledWith({
        where: { id: 'any_id' },
      });
      expect(questionnaireDataSpy).toBeCalledWith({
        where: { idQuestionnaire: 'any_id' },
        include: { device: true, applier: true },
      });
      expect(questionSpy).toBeCalledWith({
        where: { idQuestionnaire: 'any_id' },
        include: { answerOptions: { where: { isActive: true } } },
      });
      expect(answerSpy).toBeCalledWith({
        where: {
          idQuestionnaireData: { in: ['any_id', 'other_id'] },
        },
        include: { question: true, answerOption: true },
      });
    });
  });
});
