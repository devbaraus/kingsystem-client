import { authenticate } from "@/services/auth-service";
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          const res = await authenticate(credentials.email, credentials.password);
          if (typeof res !== "undefined") {
            return { ...res.user, access_token: res.access_token };
            // return { ...res.user, access_token: res.access_token };
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
