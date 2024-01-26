"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function ButtomGoogle() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="px-6 py-2 bg-white text-black rounded-lg"
      >
        Sign out
      </button>
    );
  }
  return (
    <div>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-2 bg-white text-black rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
