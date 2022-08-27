import { Injectable } from '@nestjs/common';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';
import { QuestionnaireDataRepository } from './questionnaire-data.repository';

@Injectable()
export class QuestionnaireDataService {
  constructor(
    private readonly questionnaireDataRepository: QuestionnaireDataRepository,
  ) {}

  async create(
    idQuestionnaire: string,
    createQuestionnaireDataDto: CreateQuestionnaireDataDto,
  ) {
    await this.questionnaireDataRepository.create({
      ...createQuestionnaireDataDto,
      idQuestionnaire,
    });
  }

  async findAll(idQuestionnaire: string) {
    return this.questionnaireDataRepository.findAll(idQuestionnaire);
  }

  async findOne(id: string) {
    return this.questionnaireDataRepository.findOne(id);
  }

  async update(
    id: string,
    updateQuestionnaireDataDto: UpdateQuestionnaireDataDto,
  ) {
    await this.questionnaireDataRepository.update(
      id,
      updateQuestionnaireDataDto,
    );
  }

  async remove(id: string) {
    await this.questionnaireDataRepository.remove(id);
  }
}
