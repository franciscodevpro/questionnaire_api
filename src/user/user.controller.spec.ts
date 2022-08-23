import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

type SutType = {
  sut: UserController;
  userServiceStub: UserService;
};

const makeSut = (): SutType => {
  class UserServiceStub {
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

    async update(id: string, updateUserDto: UpdateUserDto) {
      Promise.resolve();
    }

    async remove(id: string) {
      Promise.resolve();
    }
  }
  const userServiceStub = new UserServiceStub() as UserService;
  const sut = new UserController(userServiceStub);

  return { sut, userServiceStub };
};

describe('UserController', () => {
  let controller: UserController;

  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [PrismaService, UserService, UserRepository],
    }).compile();

    controller = module.get<UserController>(UserController);
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should call repository', async () => {
      const { sut, userServiceStub } = makeSut();
      const createSpy = jest.spyOn(userServiceStub, 'create');
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
      const { sut, userServiceStub } = makeSut();
      const findAllSpy = jest.spyOn(userServiceStub, 'findAll');
      await sut.findAll();
      expect(findAllSpy).toBeCalledTimes(1);
    });
  });

  describe('#findOne', () => {
    it('should call repository', async () => {
      const { sut, userServiceStub } = makeSut();
      const findOneSpy = jest.spyOn(userServiceStub, 'findOne');
      await sut.findOne('any_id');
      expect(findOneSpy).toBeCalledWith('any_id');
    });
  });

  describe('#update', () => {
    it('should call repository', async () => {
      const { sut, userServiceStub } = makeSut();
      const updateSpy = jest.spyOn(userServiceStub, 'update');
      await sut.update('any_id', {
        name: 'other_name',
        password: 'other_password',
        login: 'other_login',
      });
      expect(updateSpy).toBeCalledWith('any_id', {
        name: 'other_name',
        password: 'other_password',
        login: 'other_login',
      });
    });
  });

  describe('#remove', () => {
    it('should call repository', async () => {
      const { sut, userServiceStub } = makeSut();
      const removeSpy = jest.spyOn(userServiceStub, 'remove');
      await sut.remove('any_id');
      expect(removeSpy).toBeCalledWith('any_id');
    });
  });
});
