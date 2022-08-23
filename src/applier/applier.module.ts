import { Module } from '@nestjs/common';
import { ApplierService } from './applier.service';
import { ApplierController } from './applier.controller';
import { PrismaService } from 'src/prisma.service';
import { ApplierRepository } from './applier.repository';

@Module({
  controllers: [ApplierController],
  providers: [PrismaService, ApplierService, ApplierRepository],
})
export class ApplierModule {}
