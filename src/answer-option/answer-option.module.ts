import { Module } from '@nestjs/common';
import { AnswerOptionService } from './answer-option.service';
import { AnswerOptionController } from './answer-option.controller';
import { AnswerOptionRepository } from './answer-option.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AnswerOptionController],
  providers: [PrismaService, AnswerOptionService, AnswerOptionRepository],
})
export class AnswerOptionModule {}
