import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIL_TRANSPORT } from '../mail-service/mail-transport.interface';

import { MailService } from '../mail-service/mail.service';
import { NodeMailerTransport } from '../mail-service/nodemailer.transport';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        // ...
      },
    }),
    BullModule.registerQueue({
      name: 'mail',
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MailService,
    {
      provide: MAIL_TRANSPORT,
      useClass: NodeMailerTransport,
    },
  ],
})
export class AppModule {}
