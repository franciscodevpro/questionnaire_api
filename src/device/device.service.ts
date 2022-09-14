import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.create(createDeviceDto);
  }

  async findAll() {
    return this.deviceRepository.findAll();
  }

  async findOne(id: string) {
    return this.deviceRepository.findOne(id);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    await this.deviceRepository.update(id, updateDeviceDto);
  }

  async remove(id: string) {
    await this.deviceRepository.remove(id);
  }
}
