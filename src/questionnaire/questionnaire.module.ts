import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireRepository } from './questionnaire.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestionnaireController],
  providers: [PrismaService, QuestionnaireService, QuestionnaireRepository],
})
export class QuestionnaireModule {}
