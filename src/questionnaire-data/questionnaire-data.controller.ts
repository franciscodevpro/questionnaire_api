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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuestionnaireDataService } from './questionnaire-data.service';
import { CreateQuestionnaireDataDto } from './dto/create-questionnaire-data.dto';
import { UpdateQuestionnaireDataDto } from './dto/update-questionnaire-data.dto';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { AnswerService } from '../answer/answer.service';

@Controller('api/questionnaire_data')
export class QuestionnaireDataController {
  constructor(
    private readonly questionnaireDataService: QuestionnaireDataService,
    private readonly answerService: AnswerService,
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

  @Post('multiple')
  async createMultiple(
    @Request() request: Request,
    @Query('idQuestionnaire') idQuestionnaire: string,
    @Body()
    createQuestionnaireDataDto: {
      questionnaireData: CreateQuestionnaireDataDto;
      answers: (CreateAnswerDto & { idAnswerOptions?: string[] })[];
    }[],
  ) {
    const resultArray = [];
    if (!createQuestionnaireDataDto?.[0])
      throw new HttpException('No data received to register response', HttpStatus.BAD_REQUEST);
    for (let answer of createQuestionnaireDataDto) {
      const resultData = await this.questionnaireDataService.create(
        idQuestionnaire,
        answer.questionnaireData,
      );

      if (!resultData?.id)
        throw new HttpException('Data could not be registered', HttpStatus.INTERNAL_SERVER_ERROR);

      resultArray.push(resultData);

      const { id } = resultData;
      
      for (let elm of answer.answers) {
        const {
          idQuestion,
          idAnswerOption,
          idAnswerOptions,
          value,
          duration,
          createdAt,
        } = elm;
        if (!idAnswerOptions || !idAnswerOptions[0])
          await this.answerService.create(id, {
            idQuestionnaireData: id,
            idQuestion,
            idAnswerOption,
            value,
            duration,
            createdAt,
          });
        else
          for (let element of idAnswerOptions) {
            await this.answerService.create(id, {
              idQuestionnaireData: id,
              idQuestion,
              idAnswerOption: element,
              value,
              duration,
              createdAt,
            });
          }
      }
    }

    return resultArray;
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
