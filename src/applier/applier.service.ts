import { Injectable } from '@nestjs/common';
import { ApplierRepository } from './applier.repository';
import { CreateApplierDto } from './dto/create-applier.dto';
import { UpdateApplierDto } from './dto/update-applier.dto';

@Injectable()
export class ApplierService {
  constructor(private readonly applierRepository: ApplierRepository) {}

  async create(createApplierDto: CreateApplierDto) {
    return this.applierRepository.create(createApplierDto);
  }

  async findAll() {
    return this.applierRepository.findAll();
  }

  async findOne(id: string) {
    return this.applierRepository.findOne(id);
  }

  async update(id: string, updateApplierDto: UpdateApplierDto) {
    await this.applierRepository.update(id, updateApplierDto);
  }

  async remove(id: string) {
    await this.applierRepository.remove(id);
  }
}
