import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthService from "@/services/auth";
import { AuthDto } from "@/types/auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: AuthDto | undefined) {
        if (credentials) {
          const res = await new AuthService().signIn(credentials.email, credentials.password);

          if (res) {
            return { ...res.user, access_token: res.access_token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.sub,
          ...session.user,
        },
        token: token.token,
      };
    },
    async jwt({ token, user }) {
      if (user) {
        const { access_token } = user as unknown as {
          access_token: string;
        };
        token.token = access_token;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
};
