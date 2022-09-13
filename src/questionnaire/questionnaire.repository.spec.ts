import { QuestionnaireRepository } from './questionnaire.repository';
import { PrismaService } from '../prisma.service';

type SutType = {
  sut: QuestionnaireRepository;
  prismaServiceStub: PrismaService;
};

const makeSut = (): SutType => {
  const prismaServiceStub = jest.mocked(new PrismaService());
  const sut = new QuestionnaireRepository(prismaServiceStub);

  return { sut, prismaServiceStub };
};

describe('QuestionnaireRepository', () => {
  describe('#create', () => {
    it('should call repository', async () => {
      const prismaServiceStub = jest.mocked(new PrismaService());
      const createSpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'create')
        .mockImplementation();
      const sut = new QuestionnaireRepository(prismaServiceStub);
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
        data: {
          name: 'any_name',
          image: 'any_image',
          quantity: 1,
          endDate: 'any_endDate',
          link: 'any_link',
          exceedsQuantity: true,
          canBeOnline: true,
          isActive: true,
          devices: {
            connect: [{ id: 'any_deviceId' }],
          },
          appliers: {
            connect: [{ id: 'any_applierId' }],
          },
        },
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'findMany')
        .mockImplementation();
      await sut.findAll();
      expect(findManySpy).toBeCalledWith({
        where: { isActive: true },
        include: { appliers: true, devices: true },
      });
    });
    it('should filter by applierId', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findManySpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'findMany')
        .mockImplementation();
      await sut.findAll('any_applierId');
      expect(findManySpy).toBeCalledWith({
        where: { isActive: true, appliers: { some: { id: 'any_applierId' } } },
        include: { appliers: true, devices: true },
      });
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const findFirstOrThrowSpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'findFirstOrThrow')
        .mockImplementation();
      await sut.findOne('any_id');
      expect(findFirstOrThrowSpy).toBeCalledWith({
        where: { id: 'any_id' },
        include: { appliers: true, devices: true },
      });
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'update')
        .mockImplementation();
      await sut.update('any_id', {
        name: 'other_name',
        image: 'other_image',
        quantity: 1,
        endDate: 'other_endDate',
        link: 'other_link',
        deviceIds: ['any_deviceId'],
        applierIds: ['any_applierId'],
      });
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: {
          name: 'other_name',
          image: 'other_image',
          quantity: 1,
          endDate: 'other_endDate',
          link: 'other_link',
          devices: {
            connect: [{ id: 'any_deviceId' }],
          },
          appliers: {
            connect: [{ id: 'any_applierId' }],
          },
        },
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, prismaServiceStub } = makeSut();
      const updateSpy = jest
        .spyOn(prismaServiceStub.questionnaire, 'update')
        .mockImplementation();
      await sut.remove('any_id');
      expect(updateSpy).toBeCalledWith({
        where: { id: 'any_id' },
        data: { isActive: false },
      });
    });
  });
});
