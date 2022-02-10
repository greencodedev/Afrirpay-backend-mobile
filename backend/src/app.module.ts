import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';

import * as OrmConfig from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    NotificationModule,
    UserModule,
    AuthModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
