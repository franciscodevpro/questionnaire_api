import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async create(idQuestionnaire: string, createQuestionDto: CreateQuestionDto) {
    await this.questionRepository.create({
      ...createQuestionDto,
      idQuestionnaire,
    });
  }

  async findAll(idQuestionnaire: string) {
    return this.questionRepository.findAll(idQuestionnaire);
  }

  async findOne(id: string) {
    return this.questionRepository.findOne(id);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: string) {
    await this.questionRepository.remove(id);
  }
}
