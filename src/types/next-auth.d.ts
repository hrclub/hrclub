import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    id: number;
    email: string;
    username: string;
  }
}
