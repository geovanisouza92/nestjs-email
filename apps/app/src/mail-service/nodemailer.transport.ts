import { Injectable } from "@nestjs/common";
import { MailTransport } from "./mail-transport.interface";
import { Message } from "./message.interface";

@Injectable()
export class NodeMailerTransport implements MailTransport {
  send(message: Message): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
