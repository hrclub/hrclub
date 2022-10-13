import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "validations/auth";
import { prisma } from "lib/prisma";
import { verify } from "argon2";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        const validated = await signInSchema.parseAsync(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email: validated.email,
          },
        });

        if (!user) return null;

        const isValidPassword = await verify(user.password, validated.password);

        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.email = token.email;
        session.username = token.username;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
  },
  secret: "super super secret",
};
