import { Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';
import { ApplierModule } from './applier/applier.module';
import { UserModule } from './user/user.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [DeviceModule, ApplierModule, UserModule, QuestionnaireModule, QuestionModule],
})
export class AppModule {}
