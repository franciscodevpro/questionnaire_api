import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;

  const makeSut = (): {
    sut: ReportsController;
    reportsServiceStubStub: ReportsService;
  } => {
    class ReportsControllerStub {
      async questionnaireData() {
        return Promise.resolve({});
      }
    }
    const reportsServiceStubStub = new ReportsControllerStub() as
      | ReportsControllerStub
      | any;
    const sut = new ReportsController(reportsServiceStubStub);

    return { sut, reportsServiceStubStub };
  };

  describe('#questionnaireData', () => {
    it('should call repository', async () => {
      const { sut, reportsServiceStubStub } = makeSut();
      const findAllSpy = jest.spyOn(
        reportsServiceStubStub,
        'questionnaireData',
      );
      await sut.questionnaireData('any_idQuestionnaire');
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });
});
