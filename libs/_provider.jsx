"use client";

import { SessionProvider } from "next-auth/react";

export const _NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
