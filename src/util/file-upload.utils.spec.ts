import * as utils from './file-upload.utils';

describe('File upload', () => {
  describe('#generateFileName', () => {
    it('Should return an unique value with extension passed', () => {
      const firstValue = utils.generateFileName('anyExt');
      const secondValue = utils.generateFileName('anyExt');
      expect(firstValue.split('.').slice(-1)[0]).toEqual('anyExt');
      expect(firstValue).not.toEqual(secondValue);
    });
  });

  describe('#diskStorageConfiguration', () => {
    it('Should call destination callback with correct values', () => {
      const config = utils
        .diskStorageConfiguration()
        .destination(null, null, (value1: string, value2: string) => {
          expect(value2).toBe('./public/uploads');
        });
    });
    it('Should call filename callback with correct values', () => {
      jest.spyOn(utils, 'generateFileName').mockReturnValueOnce('any_filename');
      const config = utils
        .diskStorageConfiguration()
        .filename(
          null,
          { originalname: 'any_name.any_ext' },
          (value1: string, value2: string) => {
            expect(value2).toBe('any_filename');
          },
        );
    });
  });
});
