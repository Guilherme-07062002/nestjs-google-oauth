import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/google-oauth.config';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
