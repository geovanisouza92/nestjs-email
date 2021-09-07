import { Test } from '@nestjs/testing';
import { MAIL_TRANSPORT } from '../mail-service/mail-transport.interface';
import { MailService } from '../mail-service/mail.service';
import { TestMailTransport } from '../test-utils/email';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        MailService,
        {
          provide: MAIL_TRANSPORT,
          useClass: TestMailTransport,
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to app!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to app!' });
    });
  });
});
