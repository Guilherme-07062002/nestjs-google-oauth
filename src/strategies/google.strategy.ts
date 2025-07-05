import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "src/auth/auth.service";
import googleOauthConfig from "src/config/google-oauth.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService,
    ) {
        super({
            clientID: googleConfiguration.clientId,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackUrl,
            scope: ['email', 'profile'],
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(
        accessToken: string, 
        refreshToken: string, 
        profile: any, 
        done: VerifyCallback
    ) {
        console.log(JSON.stringify(profile, null, 2));
    }   
}