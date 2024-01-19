import React from "react";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import MenuSideBar from "./MenuSideBar";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";
export default function LeftSideBar() {
  return (
    <div className="h-screen flex flex-col justify-between gap-6 items-center p-4 overflow-auto sticky top-0 left-0 max-md:hidden max-w-72 w-full">
      <Link href="/">
        <p>Mancolandia Games</p>
      </Link>
      <div className="flex flex-col gap-2 items-center">
        <Image
          src="/assets/logo.webp"
          alt="Profile photo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="">Elvio Galeano</p>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center">
          <p>1</p>
          <p className="text-sm">Posts</p>
        </div>
        <div className="flex flex-col items-center">
          <p>1</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <p>1</p>
          <p className="text-sm">Following</p>
        </div>
      </div>
      <MenuSideBar />
      <div className="flex gap-4 items-center">
        <UserButton />
        <p>Manage Account</p>
      </div>
      <SignedIn>
        <SignOutButton>
          <div className="flex gap-3 items-center cursor-pointer">
            <Logout />
            <p>Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
}
