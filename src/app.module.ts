import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';
import { ApplierModule } from './applier/applier.module';
import { UserModule } from './user/user.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionModule } from './question/question.module';
import { AnswerOptionModule } from './answer-option/answer-option.module';
import { QuestionnaireDataModule } from './questionnaire-data/questionnaire-data.module';
import { AnswerModule } from './answer/answer.module';
import { LoginModule } from './login/login.module';
import { BearerAuthorizationMiddleware } from './middlewares/bearer-authorization-middleware';
import { QuestionnaireController } from './questionnaire/questionnaire.controller';
import { QuestionnaireDataController } from './questionnaire-data/questionnaire-data.controller';
import { QuestionController } from './question/question.controller';
import { AnswerOptionController } from './answer-option/answer-option.controller';
import { AnswerController } from './answer/answer.controller';
import { ApplierController } from './applier/applier.controller';
import { DeviceController } from './device/device.controller';
import { UserRepository } from './user/user.repository';
import { PrismaService } from './prisma.service';
import { BasicAuthorizationMiddleware } from './middlewares/basic-authorization-middleware';
import { ApplierRepository } from './applier/applier.repository';
import { DeviceRepository } from './device/device.repository';
import { CheckAuthMiddleware } from './middlewares/check-auth-error-middleware';

@Module({
  imports: [
    DeviceModule,
    ApplierModule,
    UserModule,
    QuestionnaireModule,
    QuestionModule,
    AnswerOptionModule,
    QuestionnaireDataModule,
    AnswerModule,
    LoginModule,
  ],
  providers: [
    PrismaService,
    UserRepository,
    ApplierRepository,
    DeviceRepository,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        BasicAuthorizationMiddleware,
        BearerAuthorizationMiddleware,
        CheckAuthMiddleware,
      )
      .forRoutes(
        QuestionnaireController,
        QuestionnaireDataController,
        QuestionController,
        AnswerOptionController,
        AnswerController,
        ApplierController,
        DeviceController,
      );
  }
}
