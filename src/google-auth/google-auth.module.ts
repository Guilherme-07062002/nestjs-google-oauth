import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthController } from './google-auth.controller';

@Module({
    imports: [
        ConfigModule.forFeature(googleOauthConfig),
        PassportModule.register({ session: false }), // Marcar true caso queira usar sessões
    ],
    controllers: [GoogleAuthController],
    providers: [GoogleAuthService, GoogleStrategy],
})
export class GoogleAuthModule {}
