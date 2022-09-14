import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';

@Injectable()
export class QuestionnaireDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionnaireDataDto & { idQuestionnaire: string }) {
    return this.prisma.questionnaireData.create({
      data: {
        ...data,
        isActive: true,
      },
    });
  }

  async findAll(idQuestionnaire: string) {
    return this.prisma.questionnaireData.findMany({
      where: { idQuestionnaire, isActive: true },
      include: { questionnaire: true, device: true, applier: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.questionnaireData.findFirstOrThrow({
      where: { id },
      include: { questionnaire: true, device: true, applier: true },
    });
  }

  async update(id: string, data: UpdateQuestionnaireDataDto) {
    await this.prisma.questionnaireData.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.questionnaireData.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
