import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        if (!bcrypt.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.data as any;

      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
