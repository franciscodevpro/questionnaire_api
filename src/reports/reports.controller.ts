import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ReportsService } from './reports.service';

@Controller('api/reports/questionnaire_data')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':id')
  questionnaireData(@Param('id') id: string) {
    return this.reportsService.questionnaireData(id);
  }
}
