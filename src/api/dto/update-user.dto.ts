import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import CreateUserDto from './create-user.dto';

enum Gender {
  male = 1,
  female,
  netural,
  unknown,
}

export default class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
  @IsOptional()
  @IsEnum(Gender, { message: 'Gender must be one of "male", "female", "netural"' })
  gender?: string;

  @IsOptional()
  @IsPositive()
  age?: number;
}
