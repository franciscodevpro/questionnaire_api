import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceRepository } from './device.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeviceController],
  providers: [PrismaService, DeviceService, DeviceRepository],
})
export class DeviceModule {}
