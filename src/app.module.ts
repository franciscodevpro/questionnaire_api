import { Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';
import { ApplierModule } from './applier/applier.module';
import { UserModule } from './user/user.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionModule } from './question/question.module';
import { AnswerOptionModule } from './answer-option/answer-option.module';
import { QuestionnaireDataModule } from './questionnaire-data/questionnaire-data.module';

@Module({
  imports: [DeviceModule, ApplierModule, UserModule, QuestionnaireModule, QuestionModule, AnswerOptionModule, QuestionnaireDataModule],
})
export class AppModule {}
