import Post from "@/app/lib/models/Post"
import User from "@/app/lib/models/User"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const GET = async (req,{params})=>{
    try {
        await connectToDB()
          const user = await User.findOne({ _id: params.id}).populate({
            path: "posts savedPosts likedPosts",
            model: Post,
            populate:{
                path:"creator",
                model:User
            },
          }).populate({
            path: "following followers",
            model: User,
            populate:{
                path:"posts savedPosts likedPosts",
                model:Post
            },
          }).exec() 
         return new Response(JSON.stringify(user),{status:200})
    } catch (error) {
        return new Response("Failed", {status:500})
    }
}
