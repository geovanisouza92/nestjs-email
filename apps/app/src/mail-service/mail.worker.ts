import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject, Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import { MailTransport, MAIL_TRANSPORT } from "./mail-transport.interface";

@Injectable()
export class MailWorkerPublisher {
  constructor(
    @InjectQueue('mail') private readonly queue: Queue,
  ) { }

  async send() {
    // TODO this.queue.add({}, { jobId: ... })
  }
}

@Processor('mail')
export class MailWorkerConsumer {
  constructor(
    @Inject(MAIL_TRANSPORT) private readonly mailTransport: MailTransport,
  ) { }

  @Process()
  async process(job: Job) {
    //
  }
}
