import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/prisma/prisma";
import axios from "axios";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const { name, email } = user;

      const https = require("https");
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });

      if (account?.provider === "google") {
        try {
          const resCheck = await axios.get(
            // `https://josbos-dashboard.vercel.app/api/auth/admin/check?email=${email}`
            `http://localhost:3000/api/auth/admin/check?email=${email}`
          );
          console.log("CHECK: ", resCheck.data.status);
          if (resCheck.data.status === false) {
            await axios.post(
              // "https://josbos-dashboard.vercel.app/api/auth/admin",
              "http://localhost:3000/api/auth/admin",
              { name, email, status: "inactive" }
            );
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      // return true;
    },
  },

  // pages: {
  //   signIn: "/auth",
  // },
  // debug: process.env.NODE_ENV === "development",
  // adapter: PrismaAdapter(prisma),
  // session: { strategy: "jwt" },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET,
  // },
  // secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
