import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "user@email.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "*****",
        },
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(
          credentials!.email,
          credentials!.password
        );
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ email, credentials, user, account, profile }) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      console.log(user);
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "non-email" },
      });

      if (dbUser?.status === false) {
        throw new Error("Usuario deshabilitado");
      }

      token.role = dbUser?.role;
      token.id = dbUser?.id === undefined ? "non-id" : dbUser.id;

      return token;
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
