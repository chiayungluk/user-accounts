import { Matches } from 'class-validator';

export default class ChangePasswordDto {
  @Matches('[0-9a-zA-Z]{8,20}')
  currentPassword: string;

  @Matches('[0-9a-zA-Z]{8,20}')
  newPassword: string;
}
