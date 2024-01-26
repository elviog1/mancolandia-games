"use client";
import React, { useEffect, useState } from "react";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import MenuSideBar from "./MenuSideBar";
import ButtomGoogle from "./ButtomGoogle";
import { useSession } from "next-auth/react";
export default function LeftSideBar() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    if (session && session.user.id) {
      try {
        const response = await fetch(`/api/user/${session.user.id}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [session]);

  return (
    <div className="h-screen flex flex-col justify-between gap-6 items-center p-4 overflow-auto sticky top-0 left-0 max-md:hidden max-w-72 w-full">
      <Link href="/">
        <p>Mancolandia Games</p>
      </Link>

      <div className="flex flex-col gap-2 items-center">
        {session && (
          <Link href={`/profile/${session?.user?.id}/posts`}>
            <Image
            src={session?.user.image}
            alt="Profile photo"
            width={100}
            height={100}
            className="rounded-full"
            />
            </Link>
        )}

        {session && <p>{session.user.name}</p>}
      </div>

      {session && (
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center">
              <p>{userData?.posts?.length || 0}</p>
              <p className="text-sm">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{userData?.followers?.length || 0}</p>
              <p className="text-sm">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <p>{userData?.following?.length || 0}</p>
              <p className="text-sm">Following</p>
            </div>
          </div>
          <MenuSideBar />
        </div>
      )}
      <div className="flex gap-4 items-center">
        {/* <UserButton /> */}
        {/* <p>Manage Account</p> */}
        <ButtomGoogle />
      </div>
      {/* <SignedIn>
        <SignOutButton>
          <div className="flex gap-3 items-center cursor-pointer">
            <Logout />
            <p>Log Out</p>
          </div>
        </SignOutButton>
      </SignedIn> */}
    </div>
  );
}
