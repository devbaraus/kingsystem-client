import { User } from "@/types/user-types";

export type AuthDto = {
  email: string;
  password: string;
};

export type SignInPayload = {
  user: User;
  access_token: string;
};
