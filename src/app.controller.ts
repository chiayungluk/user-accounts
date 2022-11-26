import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/')
export default class AppController {
  @Get()
  @HttpCode(200)
  live() {}
}
