"use client";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

export default function Home() {
  const [allposts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setAllPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getAllPosts();
  }, [setLoading]);
  return (
    <div className="h-screen overflow-y-scroll px-2">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {allposts.map((post) => (
            <PostCard key={post._id} post={post} update={getAllPosts} />
          ))}
        </div>
      )}
    </div>
  );
}
