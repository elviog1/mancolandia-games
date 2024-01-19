"use client";
import { UserButton } from "@clerk/nextjs";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TopBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search posts, peoples..."
          value={search}
          onChange={(e) => e.target.value}
          className="w-full py-2 px-4 rounded-lg"
        />
        <Search
          sx={{ color: "black", fontSize: "34px" }}
          className="bg-white hover:text-blue-900 top-1 cursor-pointer relative right-9 rounded-lg"
          onClick={() => {
            console.log("first");
          }}
        />
      </div>
      <button
        className="bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-700 duration-200 max-md:hidden"
        onClick={() => router.push("/create-post")}
      >
        New Post
      </button>
      <div className="hidden max-md:block">
        <UserButton />
      </div>
    </div>
  );
}
