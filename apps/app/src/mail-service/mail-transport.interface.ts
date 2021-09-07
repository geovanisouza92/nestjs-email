import { Message } from "./message.interface";

export const MAIL_TRANSPORT = Symbol.for('MailTransport');

export interface MailTransport {
  send(message: Message): Promise<void>;
}
