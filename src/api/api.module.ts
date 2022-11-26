import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import AuthModule from '../auth/auth.module';
import UsersModule from '../users/users.module';
import AuthController from './auth.controller';
import apiConfig from './config/api.config';
import ApiController from './users.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forFeature(apiConfig),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(apiConfig)],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('throttler.ttl'),
        limit: configService.get('throttler.limit'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiController, AuthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export default class ApiModule {}
