import { Test, TestingModule } from '@nestjs/testing';
import { MAIL_TRANSPORT } from '../mail-service/mail-transport.interface';

import { MailService } from '../mail-service/mail.service';
import { getTokenFromMagicLink, TestMailTransport } from '../test-utils/email';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        MailService,
        {
          provide: MAIL_TRANSPORT,
          useClass: TestMailTransport,
        }
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to app!"', () => {
      const appController = module.get(AppController);
      expect(appController.getData()).toEqual({ message: 'Welcome to app!' });
    });
  });

  describe('Login with magic link', () => {
    let mailbox: TestMailTransport;

    beforeAll(() => {
      mailbox = module.get(MAIL_TRANSPORT);
    });

    beforeEach(() => {
      mailbox.clear();
    });

    it('should send a magic link', async () => {
      // Arrange
      const appController = module.get(AppController);

      // Act
      await appController.sendMagicLink('foo@example.com');

      // Assert
      expect(mailbox.allMessages()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ subject: 'Magic Link' }),
        ]),
      );
    });

    it('should login with a magic link', async () => {
      // Arrange
      const appController = module.get(AppController);
      await appController.sendMagicLink('foo@example.com');
      const message = mailbox.openMessage({ subject: 'Magic Link' });
      const token = getTokenFromMagicLink(message.links['Login']);

      // Act
      const session = await appController.loginWithMagicLink(token);

      // Assert
      expect(session).toBeDefined();
    });
  });
});
