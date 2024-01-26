import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  savedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  likedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
