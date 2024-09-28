import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { MicrosoftProfile, MicrosoftProfileFormatted } from './microsoft.types';

@Injectable()
export class MicrosoftService {
  async fetchMicrosoftProfile(accessToken: string): Promise<MicrosoftProfile> {
    const response = await axios.get<MicrosoftProfile>('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  formatMicrosoftProfileData(data: MicrosoftProfile): MicrosoftProfileFormatted {
    const result = {} as MicrosoftProfileFormatted;

    result.firstName = data?.givenName;
    result.lastName = data?.surname;

    return result;
  }
}
