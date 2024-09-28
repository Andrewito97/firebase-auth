import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as OAuth from 'oauth-1.0a';

import { TwitterProfile, TwitterProfileFormatted } from './twitter.types';
import { createHmac } from 'crypto';

@Injectable()
export class TwitterService {
  getAuthHeader({
    url,
    method,
    accessToken,
    secret,
  }: {
    url: string;
    method: string;
    accessToken: string;
    secret: string;
  }) {
    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_API_KEY,
        secret: process.env.TWITTER_API_SECRET,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return createHmac('sha1', key).update(base_string).digest('base64');
      },
    });

    const token = {
      key: accessToken,
      secret,
    };

    const requestData = {
      url,
      method,
    };

    return oauth.toHeader(oauth.authorize(requestData, token));
  }

  async fetchTwitterProfile({
    accessToken,
    secret,
    userName,
  }: {
    accessToken: string;
    secret: string;
    userName: string;
  }): Promise<TwitterProfile> {
    try {
      const url = `https://api.twitter.com/2/users/by/username/${userName}`;

      const authHeader = this.getAuthHeader({ url, method: 'GET', accessToken, secret });

      const response = await axios.get<TwitterProfile>(url, {
        headers: {
          ...authHeader,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.log('Axios error: ', error);
    }
  }

  formatTwitterProfileData(data: TwitterProfile): TwitterProfileFormatted {
    const result = {} as TwitterProfileFormatted;

    const [firstName, lastName] = (data?.data?.name || '').split(' ');

    result.firstName = firstName;
    result.lastName = lastName;

    return result;
  }
}
