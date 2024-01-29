import Post from "@/app/lib/models/Post"
import User from "@/app/lib/models/User"
import { connectToDB } from "@/app/lib/mongodb/mongoose"

export const POST = async (req,{params}) =>{

    try {
        await connectToDB()
        const userId = params.id
        const postId = params.postId

        const user = await User.findById(userId).populate("posts savedPosts likedPosts following followers")
        const post = await Post.findById(postId).populate("creator likes")

        const isLiked = user.likedPosts.find(item => item._id.toString() === postId)

        if(isLiked){
            user.likedPosts = user.likedPosts.filter(item => item._id.toString() !== postId)
            post.likes = post.likes.filter(item => item._id.toString() !== user._id.toString())
        }else{
            user.likedPosts.push(post._id)
            post.likes.push(user._id)
        }

        await user.save()
        await post.save()
        return new Response(JSON.stringify(user),{status:200})

    } catch (error) {
        return new Response("Failed to like/dislike post", {status:500})
    }
}
