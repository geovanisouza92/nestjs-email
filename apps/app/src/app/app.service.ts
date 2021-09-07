import { Injectable } from '@nestjs/common';
import { MailService } from '../mail-service/mail.service';
import { MagicLinkEmail } from '../mailers/magic-link-email';
import { Email, MagicToken } from '../mailers/types';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService,
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to app!' };
  }

  async sendMagicLink(destination: Email) {
    // Create a new (JWT?) token with email inside
    const token = new MagicToken(destination);
    // Create email to render template with link
    const message = new MagicLinkEmail(destination, token);
    // Send the email
    await this.mailService.send(message);
  }
}
