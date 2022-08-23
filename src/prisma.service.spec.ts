import { INestApplication } from '@nestjs/common';
import { PrismaService } from './prisma.service';

const makeSut = (): PrismaService => {
  return new PrismaService();
};

describe('PrismaService', () => {
  it('should call connect method on onModuleInit call', async () => {
    const sut = makeSut();
    const connectSpy = jest.spyOn(sut, '$connect').mockImplementation();
    await sut.onModuleInit();
    expect(connectSpy).toBeCalledTimes(1);
  });

  it('should call connect method on onModuleInit call', async () => {
    const sut = makeSut();
    const connectSpy = jest
      .spyOn(sut, '$on')
      .mockImplementation(async (str: string, fn: Function) => {
        await fn();
      });
    const appModule = { close: () => {} } as INestApplication;
    const closeSpy = jest.spyOn(appModule, 'close');
    await sut.enableShutdownHooks(appModule);
    expect(connectSpy).toHaveBeenCalledWith('beforeExit', expect.anything());
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});
