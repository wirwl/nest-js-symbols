import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!1111' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
