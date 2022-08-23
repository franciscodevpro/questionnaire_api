import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDeviceDto) {
    await this.prisma.device.create({ data: { ...data, isActive: true } });
  }

  async findAll() {
    return this.prisma.device.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.device.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, data: UpdateDeviceDto) {
    await this.prisma.device.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.device.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
