export type TwitterProfile = {
  data: {
    id: string;
    name: string;
    username: string;
  };
};

export type TwitterProfileFormatted = {
  firstName: string;
  lastName: string;
  birthday?: string;
};
