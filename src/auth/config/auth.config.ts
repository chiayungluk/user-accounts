import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS ? +process.env.BCRYPT_SALT_ROUNDS : 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresInSec: process.env.JWT_EXPIRES_IN_SEC,
    ignoreExpire: process.env.JWT_IGNORE_EXPIRE || false,
  },
}));
