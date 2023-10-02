import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "@/services/auth-service";
import { AuthDto } from "@/types/auth-types";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials: AuthDto | undefined) {
        if (credentials) {
          const res = await authenticate(credentials.email, credentials.password);
          if (res) {
            return { ...res.user, access_token: res.access_token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" }
};
