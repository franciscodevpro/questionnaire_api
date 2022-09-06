import { Test, TestingModule } from '@nestjs/testing';
import { AudioUploadController } from './audio-upload.controller';

describe('AudioUploadController', () => {
  let controller: AudioUploadController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioUploadController],
    }).compile();

    controller = module.get<AudioUploadController>(AudioUploadController);
    expect(controller).toBeDefined();
  });

  describe('#uploadFile', () => {
    it('Should return correct values on success', () => {
      const sut = new AudioUploadController();
      const result = sut.uploadFile({
        mimetype: 'any_mimetype',
        filename: 'any_filename',
        size: 1,
      } as any);
      expect(result).toEqual({
        mimetype: 'any_mimetype',
        filename: 'any_filename',
        path: `/uploads/any_filename`,
        size: 1,
      });
    });
  });
});
