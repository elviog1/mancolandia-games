
import User from "@/app/lib/models/User";
import { connectToDB } from "@/app/lib/mongodb/mongoose";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({profile}){
      try {
        await connectToDB()

        const userExist = await User.findOne({email:profile.email})
        if(!userExist){
          await User.create({
            email: profile.email,
            name:profile.name,
            picture:profile.picture
          })
        }
        return true
      } catch (error) {
        return false
      }
    }
  },
});

export {handler as GET, handler as POST}
