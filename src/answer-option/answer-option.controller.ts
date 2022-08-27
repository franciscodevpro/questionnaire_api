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
import { AnswerOptionService } from './answer-option.service';
import { CreateAnswerOptionDto } from './dto/create-answer-option.dto';
import { UpdateAnswerOptionDto } from './dto/update-answer-option.dto';

@Controller('api/answer_options')
export class AnswerOptionController {
  constructor(private readonly answerOptionService: AnswerOptionService) {}

  @Post()
  create(
    @Query('idQuestion') idQuestion: string,
    @Body() createAnswerOptionDto: CreateAnswerOptionDto,
  ) {
    return this.answerOptionService.create(idQuestion, createAnswerOptionDto);
  }

  @Get()
  findAll(@Query('idQuestion') idQuestion: string) {
    return this.answerOptionService.findAll(idQuestion);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerOptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerOptionDto: UpdateAnswerOptionDto,
  ) {
    return this.answerOptionService.update(id, updateAnswerOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerOptionService.remove(id);
  }
}
