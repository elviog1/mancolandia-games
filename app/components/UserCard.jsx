"use client";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export default function UserCard({ userData , update }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${session.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  const isFollowing = userInfo?.following?.find(
    (item) => item._id === userData._id
  );

  const handleFollow = async () => {
    const response = await fetch(
      `/api/user/${session?.user?.id}/follow/${userData._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserInfo(data);
    update()
  };

  return loading ? (
    <div className="flex justify-center">
      <Loader />
    </div>
  ) : (
    <div className="flex justify-between items-center bg-gray-900 p-2 rounded-lg">
      <div className="flex gap-4 items-center">
        <Image
          src={userData?.picture}
          width={50}
          height={50}
          alt="Profile photo"
          className="rounded-full"
        />
        <Link href={`/profile/${userData._id}/posts`}>
          <p className="text-xl hover:text-red-500 duration-200">
            {userData.name}
          </p>
        </Link>
      </div>

      {session.user.id !== userData._id &&
        (isFollowing ? (
          <PersonRemove
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => handleFollow()}
          />
        ) : (
          <PersonAddAlt
            sx={{ color: "green", cursor: "pointer" }}
            onClick={() => handleFollow()}
          />
        ))}
    </div>
  );
}
