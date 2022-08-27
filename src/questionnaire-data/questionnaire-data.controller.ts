import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionnaireDataService } from './questionnaire-data.service';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';

@Controller('api/questionnaire_data')
export class QuestionnaireDataController {
  constructor(
    private readonly questionnaireDataService: QuestionnaireDataService,
  ) {}

  @Post()
  create(
    @Query('idQuestionnaire') idQuestionnaire: string,
    @Body() createQuestionnaireDataDto: CreateQuestionnaireDataDto,
  ) {
    return this.questionnaireDataService.create(
      idQuestionnaire,
      createQuestionnaireDataDto,
    );
  }

  @Get()
  findAll(@Query('idQuestionnaire') idQuestionnaire: string) {
    return this.questionnaireDataService.findAll(idQuestionnaire);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireDataService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionnaireDataDto: UpdateQuestionnaireDataDto,
  ) {
    return this.questionnaireDataService.update(id, updateQuestionnaireDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionnaireDataService.remove(id);
  }
}
