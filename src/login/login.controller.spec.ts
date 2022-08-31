import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '../user/user.repository';
import { PasswordUtil } from '../util/password.util';
import { TokenUtil } from '../util/token.util';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

type SutType = {
  sut: LoginController;
  loginServiceStub: LoginService;
};

const makeSut = (): SutType => {
  class LoginServiceStub {
    async login(data: { login: string; password: string }) {
      return Promise.resolve({
        token: 'any_token',
        tokenExpiration: 1,
      });
    }

    async signup(data: {
      login: string;
      password: string;
      passwordConfirmation: string;
      name: string;
    }) {
      return Promise.resolve({
        token: 'any_token',
        tokenExpiration: 1,
      });
    }
  }
  const loginServiceStub = new LoginServiceStub() as LoginService;
  const sut = new LoginController(loginServiceStub);

  return { sut, loginServiceStub };
};

describe('LoginController', () => {
  let controller: LoginController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        PrismaService,
        LoginService,
        UserRepository,
        TokenUtil,
        PasswordUtil,
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    expect(controller).toBeDefined();
  });

  describe('#login', () => {
    it('should call service method', async () => {
      const { sut, loginServiceStub } = makeSut();
      const loginSpy = jest.spyOn(loginServiceStub, 'login');
      await sut.login({ login: 'any_login', password: 'any_password' });
      expect(loginSpy).toBeCalledWith({
        login: 'any_login',
        password: 'any_password',
      });
    });
  });

  describe('#signup', () => {
    it('should call service method', async () => {
      const { sut, loginServiceStub } = makeSut();
      const signupSpy = jest.spyOn(loginServiceStub, 'signup');
      await sut.signup({
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation',
        name: 'any_name',
      });
      expect(signupSpy).toBeCalledWith({
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation',
        name: 'any_name',
      });
    });
  });
});
