import { Message } from "../mail-service/message.interface";
import { Email, MagicToken } from "./types";

export class MagicLinkEmail implements Message {
  readonly subject = 'Magic Link';

  constructor(
    private destination: Email,
    private token: MagicToken,
  ) {}

  render() {
    return `<a href="http://example.com/login/${this.token.value}">Login</a>`;
  }
}
