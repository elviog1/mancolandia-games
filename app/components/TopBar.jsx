"use client";
import { Logout, Search } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TopBar() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const router = useRouter();
  
  return (
    <div className="flex justify-between  items-center mt-4">
      <div className="flex w-full">
        <input
          type="text"
          className=" py-2 px-4 rounded-lg text-black"
          placeholder="Search posts, peoples..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          sx={{ color: "black", fontSize: "34px" }}
          className="bg-white hover:text-blue-900 top-1 cursor-pointer relative right-9 rounded-lg"
          onClick={() => {
            router.push(`/search/posts/${search}`);
          }}
        />
      </div>
      <button
        className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-500 duration-200 max-md:hidden"
        onClick={() => router.push("/create-post")}
      >
        New Post
      </button>
      {session && (
        <div className="flex items-center gap-5 md:hidden">

          <Link href={`/profile/${session?.user?.id}/posts`} className="flex justify-end">
            <Image
            src={session?.user.image}
            alt="Profile photo"
            width={60}
            height={60}
            className="rounded-full"
            />
            </Link>
            <Logout sx={{color:"white", cursor:"pointer", fontSize:"30px"}} onClick={()=>signOut()} />
            </div>
        )}
      <div className="hidden max-md:block"></div>
    </div>
  );
}
