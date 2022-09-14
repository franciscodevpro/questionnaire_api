import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer-option.dto';

@Injectable()
export class AnswerOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAnswerOptionDto & { idQuestion: string }) {
    return this.prisma.answerOption.create({
      data: { ...data, isActive: true },
    });
  }

  async findAll(idQuestion: string) {
    return this.prisma.answerOption.findMany({
      where: { idQuestion, isActive: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.answerOption.findFirstOrThrow({
      where: { id },
    });
  }

  async update(id: string, data: UpdateAnswerOptionDto) {
    await this.prisma.answerOption.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.answerOption.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
