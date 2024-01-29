"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Posting from "@/app/components/form/Posting";
import Loader from "@/app/components/Loader";

export default function EditPost() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  const getPost = async () => {
    const response = await fetch(`/api/post/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setPostData(data);
    setLoading(!loading);
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const postInfo = {
    creator: id,
    game: postData?.game,
    title: postData?.title,
    description: postData?.description,
  };
  return (
    <div className="flex flex-col items-center">
      {loading ? <Loader /> : <Posting post={postInfo} apiEndpoint={`/api/post/${id}`} />}
    </div>
  );
}
