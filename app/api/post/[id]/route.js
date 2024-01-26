import Post from "@/app/lib/models/Post";
import { connectToDB } from "@/app/lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id)
      .populate("creator likes")
      .exec();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get post", { status: 500 });
  }
};

export const POST = async (req,{params}) => {
  try {
    await connectToDB();
    const data = await req.formData();

    const post = await Post.findByIdAndUpdate(
      params.id,
      {
        $set: {
          creator: data.get("creator"),
          game: data.get("game"),
          title: data.get("title"),
          description: data.get("description"),
        },
      },
      { new: true, useFindAndModify: false }
    );

    await post.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the post", { status: 500 });
  }
};
