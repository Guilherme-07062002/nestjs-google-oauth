import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "src/config/google-oauth.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(googleOauthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOauthConfig>
    ) {
        super({
            clientID: googleConfiguration.clientId,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackUrl,
            scope: ['email', 'profile'],
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        console.log('Google profile', profile);
    }   
}