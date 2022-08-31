import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '../user/user.repository';
import { PasswordUtil } from '../util/password.util';
import { TokenUtil } from '../util/token.util';
import { AccessToken } from './entities/token.entity';
import { LoginService } from './login.service';

type SutType = {
  sut: LoginService;
  userRepositoryStub: UserRepository;
  tokenUtilStub: TokenUtil;
  passwordUtilStub: PasswordUtil;
};

const makeSut = (): SutType => {
  class UserRepositoryStub {
    async create(data: CreateUserDto) {
      Promise.resolve();
    }

    async findAll() {
      return Promise.resolve([
        {
          id: 'any_id',
          name: 'any_name',
          password: 'any_password',
          login: 'any_login',
          token: 'any_token',
          tokenExpiration: 1,
          isActive: true,
        },
      ]);
    }

    async findOne(id: string) {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
        token: 'any_token',
        tokenExpiration: 1,
        isActive: true,
      });
    }

    async findOneByLogin(login: string) {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
        token: 'any_token',
        tokenExpiration: 1,
        isActive: true,
      });
    }

    async update(id: string, data: UpdateUserDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  class TokenUtilStub {
    public generateToken(): AccessToken {
      return { token: 'any_token', tokenExpiration: 1 };
    }
  }
  class PasswordUtilStub {
    public comparePassword(plainText: string, encrypted: string) {
      return true;
    }

    public encryptPassword(plainText: string): string {
      return 'any_encryptPassword';
    }
  }
  const userRepositoryStub = new UserRepositoryStub() as UserRepository;
  const tokenUtilStub = new TokenUtilStub();
  const passwordUtilStub = new PasswordUtilStub();
  const sut = new LoginService(
    userRepositoryStub,
    tokenUtilStub,
    passwordUtilStub,
  );

  return { sut, userRepositoryStub, tokenUtilStub, passwordUtilStub };
};

describe('LoginService', () => {
  let service: LoginService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        LoginService,
        UserRepository,
        TokenUtil,
        PasswordUtil,
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
    expect(service).toBeDefined();
  });

  describe('#login', () => {
    it('should call user repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const findOneByLoginSpy = jest.spyOn(
        userRepositoryStub,
        'findOneByLogin',
      );
      await sut.login({ login: 'any_login', password: 'any_password' });
      expect(findOneByLoginSpy).toBeCalledTimes(1);
    });

    it('should return null if no user be found', async () => {
      const { sut, userRepositoryStub } = makeSut();
      jest
        .spyOn(userRepositoryStub, 'findOneByLogin')
        .mockReturnValueOnce(null);
      const loginData = await sut.login({
        login: 'any_login',
        password: 'any_password',
      });
      expect(loginData).toBeNull();
    });

    it('should call compare password method', async () => {
      const { sut, passwordUtilStub } = makeSut();
      const comparePasswordSpy = jest.spyOn(
        passwordUtilStub,
        'comparePassword',
      );
      await sut.login({ login: 'any_login', password: 'any_password' });
      expect(comparePasswordSpy).toBeCalledWith('any_password', 'any_password');
    });

    it('should return null if compare password fails', async () => {
      const { sut, passwordUtilStub } = makeSut();
      jest
        .spyOn(passwordUtilStub, 'comparePassword')
        .mockReturnValueOnce(false);
      const loginData = await sut.login({
        login: 'any_login',
        password: 'any_password',
      });
      expect(loginData).toBeNull();
    });

    it('should call token generate method', async () => {
      const { sut, tokenUtilStub } = makeSut();
      const generateTokenSpy = jest.spyOn(tokenUtilStub, 'generateToken');
      await sut.login({ login: 'any_login', password: 'any_password' });
      expect(generateTokenSpy).toBeCalledTimes(1);
    });
  });

  describe('#signup', () => {
    it('should call user repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(userRepositoryStub, 'create');
      await sut.signup({
        login: 'any_login',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation',
        name: 'any_name',
      });
      expect(createSpy).toBeCalledTimes(1);
    });
  });
});
