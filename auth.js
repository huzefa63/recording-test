import axios from "axios";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        // console.log("session");
        try {
          const signedJwt = jwt.sign(
            { email: profile.email, name: profile.name },
            process.env.JWT_SECRET,
          );
          const res = await axios.post(
            `${process.env.URL}/auth/signin`,
            {},
            {
              headers: {
                Authorization: `Bearer ${signedJwt}`,
              },
            },
          );
          token.jwt = res.data.jwt;
        } catch (err) {
          console.log(err);
          throw new Error("failed");
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
    error: "/error",
  },
});
