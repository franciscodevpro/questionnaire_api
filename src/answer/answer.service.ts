import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async create(idQuestionnaireData: string, createAnswerDto: CreateAnswerDto) {
    return this.answerRepository.create({
      ...createAnswerDto,
      idQuestionnaireData,
    });
  }

  async findAll(idQuestionnaireData: string) {
    return this.answerRepository.findAll(idQuestionnaireData);
  }

  async findOne(id: string) {
    return this.answerRepository.findOne(id);
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    await this.answerRepository.update(id, updateAnswerDto);
  }

  async remove(id: string) {
    await this.answerRepository.remove(id);
  }
}
