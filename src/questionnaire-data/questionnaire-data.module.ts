import { Module } from '@nestjs/common';
import { QuestionnaireDataService } from './questionnaire-data.service';
import { QuestionnaireDataController } from './questionnaire-data.controller';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestionnaireDataController],
  providers: [
    PrismaService,
    QuestionnaireDataService,
    QuestionnaireDataRepository,
  ],
})
export class QuestionnaireDataModule {}
