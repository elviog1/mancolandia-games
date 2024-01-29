"use client";
import { Favorite } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RightSideBar() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await fetch(`/api/user`);
    const data = await response.json();
    setLoading(false);
    setAllUsers(data);
  };

  const totalLikedByUser = (user) => {
    return user.posts.reduce((totalLikes, post) => totalLikes + post.likes.length, 0);
  };

  const sortedUsers = [...allUsers].sort(
    (a, b) => totalLikedByUser(b) - totalLikedByUser(a)
  );

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="sticky right-0 top-0 z-20 h-screen items-center py-6 flex flex-col gap-10 max-w-64  w-full max-lg:hidden">
      <div className="flex flex-col gap-4">
        <h4 className="text-2xl font-semibold">Ranking Liked</h4>
        <div className="flex flex-col gap-4">
          {sortedUsers.map((user) => (
            <div className="flex gap-4 items-center" key={user._id}>
              <Link
                href={`/profile/${user?._id}/posts`}
                className="flex items-center gap-4"
              >
                <Image
                  src={user?.picture}
                  alt="Profile photo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {user.name}
              </Link>
              <div className="flex gap-1">
                <Favorite sx={{ color: "red" }} />
                <span>x{totalLikedByUser(user)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
