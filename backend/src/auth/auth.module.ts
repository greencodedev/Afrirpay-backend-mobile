import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/core/constants/basic.contant';
import { JwtStrategy } from 'src/core/guards/jwt.strategy';
import { OtpModule } from 'src/otp/otp.module';

import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidator } from './validation/auth.validate';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: jwtConstant.expiresIn },
    }),
    UserModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthValidator],
})
export class AuthModule {}
