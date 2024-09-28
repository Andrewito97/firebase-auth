export class AuthLoginDto {
  firebaseToken: string;
  accessToken: string;
  secret?: string;
  userName?: string;
}

export class AuthLoginResponse {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string | null;
}
