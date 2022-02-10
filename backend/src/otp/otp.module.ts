import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { OtpValidator } from './validation/otp.validate';

@Module({
  imports: [UserModule],
  controllers: [OtpController],
  providers: [OtpService, OtpValidator],
  exports: [OtpService],
})
export class OtpModule {}
