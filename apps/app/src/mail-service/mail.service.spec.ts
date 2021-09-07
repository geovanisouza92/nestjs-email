import { Test, TestingModule } from '@nestjs/testing';
import { TestMailTransport } from '../test-utils/email';
import { MAIL_TRANSPORT } from './mail-transport.interface';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MAIL_TRANSPORT,
          useClass: TestMailTransport,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
