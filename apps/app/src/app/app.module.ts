import { Module } from '@nestjs/common';

import { MailService } from '../mail-service/mail.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    MailService,
  ],
})
export class AppModule {}
