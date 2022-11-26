import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import MongooseConfig from './config/mongoose.config';
import userConfig from './config/users.config';
import User, { UserSchema } from './entities/user.entity';
import UsersService from './users.service';

@Module({
  imports: [
    ConfigModule.forFeature(userConfig),
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  providers: [UsersService, User, MongooseConfig],
  exports: [UsersService, User],
})
export default class UsersModule {}
