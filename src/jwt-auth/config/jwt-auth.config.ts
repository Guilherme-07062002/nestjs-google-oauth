import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL,
}));
