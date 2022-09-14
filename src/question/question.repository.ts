import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionDto & { idQuestionnaire: string }) {
    return this.prisma.question.create({
      data: { ...data, isActive: true },
    });
  }

  async findAll(idQuestionnaire: string) {
    return this.prisma.question.findMany({
      where: { idQuestionnaire, isActive: true },
      include: { answerOptions: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.question.findFirstOrThrow({
      where: { id },
      include: { answerOptions: true },
    });
  }

  async update(id: string, data: UpdateQuestionDto) {
    await this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.question.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
