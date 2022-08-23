import { Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';
import { ApplierModule } from './applier/applier.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DeviceModule, ApplierModule, UserModule],
})
export class AppModule {}
