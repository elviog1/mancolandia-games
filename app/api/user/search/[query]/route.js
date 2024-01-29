import User from "@/app/lib/models/User"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const GET = async(req,{params})=>{
    const {query} = params
    try {
        await connectToDB()
        const searchPosts = await User.find({
            $or:[
                {name:{$regex:query, $options: "i"}},
            ]
        }).populate("posts savedPosts likedPosts followers following").exec()
        return new Response(JSON.stringify(searchPosts),{status:200})
    } catch (error) {
        return new Response("Failed to search", {status:500})
    }
}