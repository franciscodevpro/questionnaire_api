import { MeController } from './me.controller';

const makeSut = () => {
  const sut = new MeController();
  return { sut };
};

describe('MeController', () => {
  describe('#find', () => {
    it('should call repository', async () => {
      const { sut } = makeSut();
      const findResult = await sut.find({
        user: {
          name: 'any_name',
          password: 'any_password',
          login: 'any_login',
        },
      } as any);
      expect(findResult).toEqual({
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
    });
  });
});
