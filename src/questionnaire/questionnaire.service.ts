import { Injectable } from '@nestjs/common';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnaireRepository } from './questionnaire.repository';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
  ) {}

  async create(createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireRepository.create(createQuestionnaireDto);
  }

  async findAll(applierId?: string) {
    return this.questionnaireRepository.findAll(applierId);
  }

  async findOne(id: string) {
    return this.questionnaireRepository.findOne(id);
  }

  async update(id: string, updateQuestionnaireDto: UpdateQuestionnaireDto) {
    await this.questionnaireRepository.update(id, updateQuestionnaireDto);
  }

  async remove(id: string) {
    await this.questionnaireRepository.remove(id);
  }
}
