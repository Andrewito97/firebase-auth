import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { GoogleProfile, GoogleProfileFormatted } from './google.types';

@Injectable()
export class GoogleService {
  async fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
    const response = await axios.get<GoogleProfile>('https://people.googleapis.com/v1/people/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        personFields: 'names,birthdays',
      },
    });

    return response.data;
  }

  formatGoogleProfileData(data: GoogleProfile): GoogleProfileFormatted {
    const result = {} as GoogleProfileFormatted;

    result.firstName = data?.names[0]?.givenName;
    result.lastName = data?.names[0]?.familyName;

    if (data.birthdays?.length) {
      const { year, month, day } = data.birthdays[0].date;

      result.birthday = new Date(Date.UTC(year, month - 1, day)).toISOString();
    }

    return result;
  }
}
