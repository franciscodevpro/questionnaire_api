import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAnswerDto & { idQuestionnaireData: string }) {
    await this.prisma.answer.create({
      data: { ...data, isActive: true },
    });
  }

  async findAll(idQuestionnaireData: string) {
    return this.prisma.answer.findMany({
      where: { idQuestionnaireData, isActive: true },
      include: { question: true, answerOption: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.answer.findFirstOrThrow({
      where: { id },
      include: { question: true, answerOption: true },
    });
  }

  async update(id: string, data: UpdateAnswerDto) {
    await this.prisma.answer.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.answer.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
