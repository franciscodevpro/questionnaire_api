import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { UserRepository } from './user.repository';
import { MeController } from './me.controller';

@Module({
  controllers: [UserController, MeController],
  providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
