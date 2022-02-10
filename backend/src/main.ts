import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as DotEnv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  DotEnv.config();
  const app = await NestFactory.create(AppModule);

  // Set the config options
  const adminConfig: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Notification Service API Documentation')
    .setDescription('This documentation is for Notification Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 8085);
}
bootstrap();
