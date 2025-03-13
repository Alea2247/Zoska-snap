// auth/[...nextauth]/authOptions.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultUser, NextAuthOptions } from "next-auth";
import { prisma } from "./prizma";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import EmailProvider from "next-auth/providers/email";
import { Session } from "next-auth";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID || "",
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || "",
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable/disable detailed logging
  pages: {
    signIn: "/auth/prihlasenie",
    signOut: "/auth/odhlasenie",
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user }: { session: Session; user: DefaultUser }) {
      session.user = user; // Include user info in the session
      return session;
    },
  },
};