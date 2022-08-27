import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaService } from '../prisma.service';
import { QuestionRepository } from './question.repository';

@Module({
  controllers: [QuestionController],
  providers: [PrismaService, QuestionService, QuestionRepository],
})
export class QuestionModule {}
