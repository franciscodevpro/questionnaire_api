import { Module } from '@nestjs/common';
import { QuestionnaireDataService } from './questionnaire-data.service';
import { QuestionnaireDataController } from './questionnaire-data.controller';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';
import { PrismaService } from '../prisma.service';
import { AnswerService } from '../answer/answer.service';
import { AnswerRepository } from '../answer/answer.repository';

@Module({
  controllers: [QuestionnaireDataController],
  providers: [
    PrismaService,
    QuestionnaireDataService,
    QuestionnaireDataRepository,
    AnswerService,
    AnswerRepository
  ],
})
export class QuestionnaireDataModule {}
