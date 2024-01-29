"use client";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { tabs } from "@/app/constants/index";
import Link from "next/link";
export default function ProfileCard({ userData, activeTab }) {
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
  };

  return (
    <div className="flex flex-col p-2 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            alt="profile photo"
            height={100}
            width={100}
            src={userData?.picture}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold">{userData?.name}</p>
            <div className="flex gap-6 text-lg flex-wrap">
              <div className="flex gap-2 items-center">
                <p className="text-blue-500 font-semibold">
                  {userData?.posts?.length}
                </p>
                <p className="font-semibold">Posts</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-blue-500">
                  {userData?.followers?.length}
                </p>
                <p className="font-semibold">Followers</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-blue-500">
                  {userData?.following?.length}
                </p>
                <p className="font-semibold">Following</p>
              </div>
            </div>
          </div>
        </div>
        {session?.user?.id !== userData._id &&
          session?.user?.id !== undefined &&
          (isFollowing ? (
            <PersonRemove
              sx={{ color: "red", cursor: "pointer", fontSize: "40px" }}
              onClick={() => handleFollow()}
            />
          ) : (
            <PersonAddAlt
              sx={{ color: "green", cursor: "pointer", fontSize: "40px" }}
              onClick={() => handleFollow()}
            />
          ))}
      </div>

      <div className="flex gap-4">
        {tabs?.map((item) => (
          <Link
            className={` px-4 py-2 rounded-lg hover:bg-blue-500 duration-200 ${
              activeTab === item.name ? "bg-blue-500" : "bg-blue-900"
            }`}
            key={item.name}
            href={`/profile/${userData._id}/${item.link}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
