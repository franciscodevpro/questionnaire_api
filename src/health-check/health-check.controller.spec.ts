import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
    expect(controller).toBeDefined();
  });

  describe('#healthcheck', () => {
    it('Should return correct values on success', () => {
      const sut = new HealthCheckController();
      const result = sut.healthcheck();
      expect(result).toEqual({
        ok: true,
      });
    });
  });
});
