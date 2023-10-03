import { User } from "@/types/user-type";

export type AuthDto = {
  email: string;
  password: string;
};

export type SignInPayload = {
  user: User;
  access_token: string;
};
