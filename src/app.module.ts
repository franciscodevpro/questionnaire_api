import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AnswerOptionController } from './answer-option/answer-option.controller';
import { AnswerOptionModule } from './answer-option/answer-option.module';
import { AnswerController } from './answer/answer.controller';
import { AnswerModule } from './answer/answer.module';
import { ApplierController } from './applier/applier.controller';
import { ApplierModule } from './applier/applier.module';
import { ApplierRepository } from './applier/applier.repository';
import { AudioUploadController } from './audio-upload/audio-upload.controller';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';
import { DeviceRepository } from './device/device.repository';
import { HealthCheckController } from './health-check/health-check.controller';
import { LoginModule } from './login/login.module';
import { BasicAuthorizationMiddleware } from './middlewares/basic-authorization-middleware';
import { BearerAuthorizationMiddleware } from './middlewares/bearer-authorization-middleware';
import { CheckAuthMiddleware } from './middlewares/check-auth-error-middleware';
import { PrismaService } from './prisma.service';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';
import { QuestionnaireDataController } from './questionnaire-data/questionnaire-data.controller';
import { QuestionnaireDataModule } from './questionnaire-data/questionnaire-data.module';
import { QuestionnaireController } from './questionnaire/questionnaire.controller';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ReportsController } from './reports/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { MeController } from './user/me.controller';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DeviceModule,
    ApplierModule,
    UserModule,
    QuestionnaireModule,
    QuestionModule,
    AnswerOptionModule,
    QuestionnaireDataModule,
    AnswerModule,
    LoginModule,
    ReportsModule,
  ],
  providers: [
    PrismaService,
    UserRepository,
    ApplierRepository,
    DeviceRepository,
  ],
  controllers: [HealthCheckController, AudioUploadController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BasicAuthorizationMiddleware)
      .forRoutes(
        { path: 'api/questionnaires*', method: RequestMethod.GET },
        QuestionnaireDataController,
        { path: 'api/questions*', method: RequestMethod.GET },
        AnswerController,
      )
      .apply(BearerAuthorizationMiddleware, CheckAuthMiddleware)
      .exclude(
        { path: 'api/appliers', method: RequestMethod.GET },
        { path: 'api/devices', method: RequestMethod.GET },
      )
      .forRoutes(
        ReportsController,
        QuestionnaireController,
        QuestionnaireDataController,
        QuestionController,
        AnswerOptionController,
        AnswerController,
        ApplierController,
        DeviceController,
        MeController,
      );

    /* consumer
    .apply(
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
      MeController,
    ); */
  }
}
