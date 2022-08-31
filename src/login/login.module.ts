import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserRepository } from '../user/user.repository';
import { PrismaService } from '../prisma.service';
import { TokenUtil } from '../util/token.util';
import { PasswordUtil } from '../util/password.util';

@Module({
  controllers: [LoginController],
  providers: [
    PrismaService,
    LoginService,
    UserRepository,
    TokenUtil,
    PasswordUtil,
  ],
})
export class LoginModule {}
