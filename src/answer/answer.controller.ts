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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('api/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(
    @Query('idQuestionnaireData') idQuestionnaireData: string,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.answerService.create(idQuestionnaireData, createAnswerDto);
  }

  @Get()
  findAll(@Query('idQuestionnaireData') idQuestionnaireData: string) {
    return this.answerService.findAll(idQuestionnaireData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(id);
  }
}
