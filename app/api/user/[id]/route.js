import User from "@/app/lib/models/User"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const GET = async (req,{params})=>{
    console.log(params)
    try {
        await connectToDB()
          const user = await User.findOne({ _id: params.id}).populate("posts savedPosts likedPosts followers following").exec() 
         console.log(user)
         return new Response(JSON.stringify(user),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Failed", {status:500})
    }
}
