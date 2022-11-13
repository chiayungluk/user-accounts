import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  hello = 'Hello World!';

  getHello(): string {
    return this.hello;
  }
}
