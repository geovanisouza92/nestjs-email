import { Inject, Injectable } from '@nestjs/common';
import { MailTransport, MAIL_TRANSPORT } from './mail-transport.interface';
import { Message } from './message.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORT) private readonly mailTransport: MailTransport,
  ) {}

  async send(message: Message) {
    await this.mailTransport.send(message);
  }
}
