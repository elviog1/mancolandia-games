import Post from "@/app/lib/models/Post"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const GET = async(req,{params})=>{
    const {query} = params
    try {
        await connectToDB()
        const searchPosts = await Post.find({
            $or:[
                {game:{$regex:query, $options: "i"}},
                {title:{$regex:query, $options: "i"}},
            ]
        }).populate("creator likes").exec()
        return new Response(JSON.stringify(searchPosts),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to search", {status:500})
    }
}