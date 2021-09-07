import { MagicLinkEmail } from './magic-link-email';
import { Email, MagicToken } from './types';

describe('MagicLinkEmail', () => {
  it('should be defined', () => {
    const destination = new Email('foo@example.com');
    const token = new MagicToken(destination);
    expect(new MagicLinkEmail(destination, token)).toBeDefined();
  });
});
