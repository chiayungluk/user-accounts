import { IsEmail, IsOptional, Matches } from 'class-validator';

export default class CreateUserDto {
  // let it be optional now
  @IsOptional()
  @IsEmail()
  email?: string;

  @Matches('[0-9a-z]{5,15}')
  username: string;

  @Matches('[0-9a-zA-Z]{8,20}')
  password: string;
}
