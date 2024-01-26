import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    game:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
      },
})
const Post = mongoose.models.Post || mongoose.model("Post",PostSchema)
export default Post