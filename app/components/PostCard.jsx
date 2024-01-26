"use client";
import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PostCard({ post }) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${session?.user?.id}`);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const isSaved = userData?.savedPosts?.find((item) => item._id === post._id);
  const isLiked = userData?.likedPosts?.find((item) => item._id === post._id);

  const handleSave = async () => {
    const response = await fetch(
      `/api/user/${session?.user?.id}/save/${post._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
  };

  const handleLike = async () => {
    const response = await fetch(
      `/api/user/${session?.user?.id}/like/${post._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
  };

  return (
    <div
      className="rounded-lg p-3 min-h-80  bg-cover flex flex-col justify-between"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/assets/${post.game.replace(
          /\s/g,
          ""
        )}.webp')`,
      }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center gap-4"
            href={`/profile/${post.creator._id}/posts`}
          >
            <Image
              src={post?.creator?.picture}
              width={50}
              height={50}
              alt="Avatar profile"
              className="rounded-full hover:opacity-70 duration-200"
            />
            <p className="font-mono font-semibold hover:text-red-500">
              {post.creator.name}
            </p>
          </Link>
        </div>

        {session?.user.id === post.creator._id && (
          <Link href={`/edit-post/${post._id}`}>
            <BorderColor sx={{ color: "white", cursor: "pointer" }} />
          </Link>
        )}
      </div>
      <div className="font-mono font-semibold text-xl">
        <p className="text-center py-4 text-4xl">{post.game}</p>
        <p className=" py-4">{post.title}</p>
        <p className="">- {post.description}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {!isLiked ? (
            <FavoriteBorder
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => handleLike()}
            />
          ) : (
            <Favorite
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => handleLike()}
            />
          )}
          <p className="text-xl">{post.likes.length}</p>
        </div>

        {session?.user.id !== post.creator._id &&
          (isSaved ? (
            <Bookmark
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleSave()}
            />
          ) : (
            <BookmarkBorder
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => handleSave()}
            />
          ))}
      </div>
    </div>
  );
}
