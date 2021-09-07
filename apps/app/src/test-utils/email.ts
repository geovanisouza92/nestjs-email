import { URL } from 'url';
import { MailTransport } from "../mail-service/mail-transport.interface";
import { Message } from "../mail-service/message.interface";
import * as cheerio from 'cheerio';

export function getTokenFromMagicLink(link) {
  const url = new URL(link);
  return url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
}

type LinkDisplayName = string;

type LinkHref = string;

type AugmentedMessage = Message & {
  links: Record<LinkDisplayName, LinkHref>;
};

export class TestMailTransport implements MailTransport {
  private messages: AugmentedMessage[] = [];

  async send(message: Message): Promise<void> {
    const links: Record<LinkDisplayName, LinkHref> = {};
    const body = message.render();
    const $ = cheerio.load(body);
    $('a').each((_, el) => {
      links[(el.firstChild as any).data] = el.attribs.href;
    });
    this.messages.push({
      ...message,
      links,
    });
  }

  openMessage(selectors: Partial<{ subject: string, from: string }>): AugmentedMessage {
    const message = this.messages.find((message) => {
      if (selectors.subject) {
        return message.subject === selectors.subject;
      }
      // if (selectors.from) {
      //   return message.from === selectors.from;
      // }
      return false;
    });
    if (!message) {
      throw new MessageNotFound();
    }
    return message;
  }

  allMessages(): Message[] {
    return this.messages.slice();
  }

  clear() {
    this.messages = [];
  }
}

class MessageNotFound extends Error { }
