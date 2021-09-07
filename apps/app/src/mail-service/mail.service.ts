import { Inject, Injectable } from '@nestjs/common';
import { MailTransport, MAIL_TRANSPORT } from './mail-transport.interface';
import { Message } from './message.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORT) private readonly mailTransport: MailTransport,
    // @Inject() private readonly publisher: MailWorkerPublisher,
  ) {}

  async send(message: Message) {
    // TODO await this.publisher.send();
    await this.mailTransport.send(message);
  }
}
