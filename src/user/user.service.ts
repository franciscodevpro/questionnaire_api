import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.userRepository.remove(id);
  }
}
