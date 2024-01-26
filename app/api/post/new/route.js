import Post from "@/app/lib/models/Post"
import User from "@/app/lib/models/User"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const POST = async (req) => {
    try {
      await connectToDB();
      const data = await req.formData();
  
      const newPost = await Post.create({
        creator: data.get("creator"),
        game: data.get("game"),
        title: data.get("title"),
        description: data.get("description"),
      });
  
      await newPost.save();
  
      await User.findByIdAndUpdate(
        data.get("creator"),
        { $push: { posts: newPost._id } },
        { new: true, useFindAndModify: false }
      );
  
      return new Response(JSON.stringify(newPost), { status: 200 });
    } catch (error) {
      console.error("Error en la API al procesar la solicitud:", error);
      return new Response("Failed to create post", { status: 500 });
    }
  };