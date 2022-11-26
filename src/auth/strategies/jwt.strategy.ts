import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '../config/auth.config';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(authConfig.KEY) config: ConfigType<typeof authConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.jwt.ignoreExpire,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: { username: string; id: string }) {
    return { id: payload.id, username: payload.username };
  }
}
