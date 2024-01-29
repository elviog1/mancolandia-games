import Post from "@/app/lib/models/Post"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const GET = async ()=>{
    try {
        await connectToDB()
        const posts = await Post.find().populate("creator likes").exec()
        return new Response(JSON.stringify(posts), {status:200})
    } catch (error) {
        return new Response("Failed to fetch all posts",{status:500})
    }
}