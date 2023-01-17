import { ReportsRepository } from './reports.repository';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  const makeSut = (): {
    sut: ReportsService;
    reportsRepositoryStub: ReportsRepository;
  } => {
    class ReportsRepositoryStub {
      async questionnaireData() {
        return Promise.resolve({});
      }
    }
    const reportsRepositoryStub = new ReportsRepositoryStub() as
      | ReportsRepository
      | any;
    const sut = new ReportsService(reportsRepositoryStub);

    return { sut, reportsRepositoryStub };
  };

  describe('#questionnaireData', () => {
    it('should call repository', async () => {
      const { sut, reportsRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(reportsRepositoryStub, 'questionnaireData');
      await sut.questionnaireData('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });
});
