/* eslint-disable no-param-reassign */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import UsersService from '../../users/users.service';

@Injectable()
export default class PassCryptPipe implements PipeTransform {
  private saltRounds: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.saltRounds = +this.configService.get('auth.bcrypt.saltRounds') || 10;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      if ('password' in value && !('newPassword' in value)) {
        const hashedPassword = await bcrypt.hash(value.password, this.saltRounds);
        value.password = hashedPassword;
      }
      if ('newPassword' in value) {
        const hashedNewPassword = await bcrypt.hash(value.newPassword, this.saltRounds);
        value.newPassword = hashedNewPassword;
      }
    }

    return value;
  }
}
