import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
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
    @Request() request: Request,
    @Query('idQuestionnaire') idQuestionnaire: string,
    @Body() createQuestionnaireDataDto: CreateQuestionnaireDataDto,
  ) {
    const { applier, device } = request as any;
    return this.questionnaireDataService.create(idQuestionnaire, {
      ...createQuestionnaireDataDto,
      idDevice: device.id as string,
      idApplier: applier.id as string,
    });
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
