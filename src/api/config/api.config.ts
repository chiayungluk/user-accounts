import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  throttler: {
    ttl: process.env.THROTTLER_TTL || 1,
    limit: process.env.THROTTLER_LIMIT || 100,
  },
}));
