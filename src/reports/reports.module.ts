import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from './reports.repository';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  providers: [PrismaService, ReportsService, ReportsRepository],
})
export class ReportsModule {}
