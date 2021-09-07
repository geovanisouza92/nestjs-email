import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Email } from '../mailers/types';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  async sendMagicLink(@Body('destination') destination: string) {
    const email = new Email(destination);
    await this.appService.sendMagicLink(email);
  }

  @Get('/login/:token')
  async loginWithMagicLink(@Param('token') token: string) {
    return null;
  }
}
