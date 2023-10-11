"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();
  return (
    <div>
      <button className="btn btn-primary" onClick={() => signIn("google")}>
        Sign In with Google
      </button>
    </div>
  );
}
