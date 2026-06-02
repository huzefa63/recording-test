import axios from "axios";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // console.log('jwt callback')
      const cookieStore = await cookies();
      const role = cookieStore.get('role')?.value;
      if (account) {
        token.idToken = account.id_token;
        token.role = role;
      }
      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken;
      session.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge:10 * 24 * 60 * 60
  },
  pages: {
    signIn: "/auth",
    error: "/error",
  },
});
