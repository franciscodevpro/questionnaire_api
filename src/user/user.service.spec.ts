import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

type SutType = {
  sut: UserService;
  userRepositoryStub: UserRepository;
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

    async findOneByToken(token: string) {
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
  const userRepositoryStub = new UserRepositoryStub() as any;
  const sut = new UserService(userRepositoryStub);

  return { sut, userRepositoryStub };
};

describe('UserService', () => {
  let service: UserService;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);

    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(userRepositoryStub, 'create');
      await sut.create({
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
      expect(createSpy).toBeCalledWith({
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
    });
  });

  describe('#findAll', () => {
    it('should call repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const findAllSpy = jest.spyOn(userRepositoryStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const findOneSpy = jest.spyOn(userRepositoryStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const updateSpy = jest.spyOn(userRepositoryStub, 'update');
      await sut.update('any_id', {
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'any_name',
        password: 'any_password',
        login: 'any_login',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, userRepositoryStub } = makeSut();
      const removeSpy = jest.spyOn(userRepositoryStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
