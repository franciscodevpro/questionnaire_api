import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplierService } from './applier.service';
import { CreateApplierDto } from './dto/create-applier.dto';
import { UpdateApplierDto } from './dto/update-applier.dto';

@Controller('api/appliers')
export class ApplierController {
  constructor(private readonly applierService: ApplierService) {}

  @Post()
  create(@Body() createApplierDto: CreateApplierDto) {
    return this.applierService.create(createApplierDto);
  }

  @Get()
  findAll() {
    return this.applierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplierDto: UpdateApplierDto) {
    return this.applierService.update(id, updateApplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applierService.remove(id);
  }
}
