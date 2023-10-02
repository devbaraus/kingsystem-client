export type AuthDto = {
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  name: string;
  access_token: string;
};
