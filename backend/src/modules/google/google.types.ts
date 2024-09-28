export type GoogleProfile = {
  resourceName: string;
  etag: string;
  names?: {
    displayName: string;
    familyName: string;
    givenName: string;
    displayNameLastFirst: string;
    unstructuredName: string;
  }[];
  birthdays?: {
    date: {
      year: number;
      month: number;
      day: number;
    };
  }[];
};

export type GoogleProfileFormatted = {
  firstName: string;
  lastName: string;
  birthday?: string;
};
