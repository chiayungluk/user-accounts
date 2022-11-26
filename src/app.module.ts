import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ApiModule from './api/api.module';
import AppController from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
})
export default class AppModule {}
