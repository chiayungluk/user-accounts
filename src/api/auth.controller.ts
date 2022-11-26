import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import AuthService from '../auth/service/auth.service';
import JwtAuthGuard from '../auth/strategies/jwt-auth.guard';
import LocalAuthGuard from '../auth/strategies/local-auth.guard';
import ChangePasswordDto from './dto/change-password.dto';

@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sessions')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(@Req() req: any) {
    const loginResult = await this.authService.login(req.user);
    return { ...loginResult, ...req.user };
  }

  // TODO: delete session

  @UseGuards(JwtAuthGuard)
  @Put('passwords')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async changePassword(@Req() req: any, @Body() changePassword: ChangePasswordDto) {
    await this.authService.changePassword(
      req.user.id,
      changePassword.currentPassword,
      changePassword.newPassword,
    );
  }
}
