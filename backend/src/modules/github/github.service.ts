import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { GithubProfile, GithubProfileFormatted } from './github.types';

@Injectable()
export class GithubService {
  async fetchGithubProfile(accessToken: string): Promise<GithubProfile> {
    const response = await axios.get<GithubProfile>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    return response.data;
  }

  formatGithubProfileData(data: GithubProfile): GithubProfileFormatted {
    const result = {} as GithubProfileFormatted;

    const [firstName, lastName] = data.name.split(' ');

    result.firstName = firstName;
    result.lastName = lastName;

    return result;
  }
}
