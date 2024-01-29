"use client";
import { Google } from "@mui/icons-material";
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
        className="px-6 flex gap-2 items-center font-semibold py-2 bg-white text-black rounded-lg"
      >
        <Google sx={{fontSize:"30px", color:"red"}} />
        Sign in with Google
      </button>
    </div>
  );
}
