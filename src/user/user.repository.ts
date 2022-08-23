import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    await this.prisma.user.create({ data: { ...data, isActive: true } as any });
  }

  async findAll() {
    return this.prisma.user.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, data: UpdateUserDto) {
    await this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
