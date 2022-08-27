import { Injectable } from '@nestjs/common';
import { AnswerOptionRepository } from './answer-option.repository';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer-option.dto';

@Injectable()
export class AnswerOptionService {
  constructor(
    private readonly answerOptionRepository: AnswerOptionRepository,
  ) {}

  async create(
    idQuestion: string,
    createAnswerOptionDto: CreateAnswerOptionDto,
  ) {
    await this.answerOptionRepository.create({
      ...createAnswerOptionDto,
      idQuestion,
    });
  }

  async findAll(idQuestion: string) {
    return this.answerOptionRepository.findAll(idQuestion);
  }

  async findOne(id: string) {
    return this.answerOptionRepository.findOne(id);
  }

  async update(id: string, updateAnswerOptionDto: UpdateAnswerOptionDto) {
    await this.answerOptionRepository.update(id, updateAnswerOptionDto);
  }

  async remove(id: string) {
    await this.answerOptionRepository.remove(id);
  }
}
