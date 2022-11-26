import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import User from '../../users/entities/user.entity';
import UsersService from '../../users/users.service';
import authConfig from '../config/auth.config';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(id: string, currentPassword: string, newpassword: string) {
    const foundUser = await this.userService.findOne(id);
    if (!foundUser) {
      throw new NotFoundException();
    }
    if (currentPassword === newpassword) {
      throw new BadRequestException('new password must be different from the current password');
    }
    if (!(await bcrypt.compare(currentPassword, foundUser.password))) {
      throw new BadRequestException('current password is wrong');
    }
    const newHashedPassword = await bcrypt.hash(newpassword, this.config.bcrypt.saltRounds);
    await this.userService.update(id, { password: newHashedPassword });
  }
}
