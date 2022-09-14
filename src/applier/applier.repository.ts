import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateApplierDto } from './dto/create-applier.dto';
import { UpdateApplierDto } from './dto/update-applier.dto';

@Injectable()
export class ApplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateApplierDto) {
    return this.prisma.applier.create({ data: { ...data, isActive: true } });
  }

  async findAll() {
    return this.prisma.applier.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.applier.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, data: UpdateApplierDto) {
    await this.prisma.applier.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.applier.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
