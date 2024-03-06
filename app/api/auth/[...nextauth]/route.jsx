import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
            `${process.env.NEXTAUTH_URL}api/auth/admin/check?email=${email}`
          );
          console.log("RES_AUTH: ", resCheck.data);

          if (resCheck.data.status === false) {
            await axios.post(`${process.env.NEXTAUTH_URL}api/auth/admin`, {
              name,
              email,
              status: "inactive",
            });
          }
          return true;
        } catch (error) {
          console.log("ERROR_AUTH: ", error);
          return false;
        }
      } else {
        return false;
      }
      // return true;
    },

    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },

  async jwt({ token, account, profile }) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    console.log("JWT: ", { token, account, profile });

    if (account) {
      token.accessToken = account.access_token;
      token.id = profile.id;
    }
    return token;
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
