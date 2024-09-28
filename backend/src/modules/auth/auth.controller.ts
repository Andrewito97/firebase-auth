import { Body, Controller, Post } from '@nestjs/common';

import { FirebaseService } from '@modules/firebase/firebase.service';
import { GithubService } from '@modules/github/github.service';
import { GoogleService } from '@modules/google/google.service';
import { MicrosoftService } from '@modules/microsoft/microsoft.service';
import { TwitterService } from '@modules/twitter/twitter.service';

import { AuthLoginDto, AuthLoginResponse } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly googleService: GoogleService,
    private readonly microsoftService: MicrosoftService,
    private readonly githubService: GithubService,
    private readonly twitterService: TwitterService,
  ) {}

  @Post('login/firebase')
  async firebaseAuth(@Body() body: AuthLoginDto): Promise<AuthLoginResponse> {
    const { firebaseToken, accessToken, secret, userName } = body;

    const decodedToken = await this.firebaseService.decodeToken(firebaseToken);

    const result: AuthLoginResponse = {
      email: decodedToken.email,
      firstName: '',
      lastName: '',
      birthday: null,
    };

    if (decodedToken.firebase.sign_in_provider === 'google.com') {
      const googleProfile = await this.googleService.fetchGoogleProfile(accessToken);
      const googleData = this.googleService.formatGoogleProfileData(googleProfile);

      result.firstName = googleData.firstName;
      result.lastName = googleData.lastName;
      result.birthday = googleData.birthday;
    }

    if (decodedToken.firebase.sign_in_provider === 'microsoft.com') {
      const microsoftProfile = await this.microsoftService.fetchMicrosoftProfile(accessToken);
      const microsoftData = this.microsoftService.formatMicrosoftProfileData(microsoftProfile);

      result.firstName = microsoftData.firstName;
      result.lastName = microsoftData.lastName;
    }

    if (decodedToken.firebase.sign_in_provider === 'github.com') {
      const githubProfile = await this.githubService.fetchGithubProfile(accessToken);
      const githubData = this.githubService.formatGithubProfileData(githubProfile);

      result.firstName = githubData.firstName;
      result.lastName = githubData.lastName;
    }

    if (decodedToken.firebase.sign_in_provider === 'twitter.com') {
      const twitterProfile = await this.twitterService.fetchTwitterProfile({
        accessToken,
        secret,
        userName,
      });

      const twitterData = this.twitterService.formatTwitterProfileData(twitterProfile);

      result.firstName = twitterData.firstName;
      result.lastName = twitterData.lastName;
    }

    return result;
  }
}
