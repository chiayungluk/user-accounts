import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import UsersModule from '../users/users.module';
import authConfig from './config/auth.config';
import PassCryptPipe from './pipes/pass-crypt.pipe';
import AuthService from './service/auth.service';
import JwtStrategy from './strategies/jwt.strategy';
import LocalStrategy from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.jwt.secret'),
        signOptions: { expiresIn: configService.get('auth.jwt.expiresInSec') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService, PassCryptPipe],
  exports: [AuthService, PassCryptPipe],
})
export default class AuthModule {}
