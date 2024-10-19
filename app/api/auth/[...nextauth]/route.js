import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from '@/database/index'
import User from '@/database/user.modal'
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import bcrypt from 'bcryptjs'


export const authOptions ={
    providers: [
        GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    httpOptions:{
      timeout: 10000,
    }
    
  }),
       Credentials({
    name: "Credentials",
     credentials: {
        email: {},
        username: {},
            },
       
            async authorize(credentials) {
             try {
                if (!credentials || !credentials.password || !credentials.email) return null;
                await connectToDatabase();
                const { email, password } = credentials;

                const user
                = await  User.findOne({ email });

                if (!user) throw new Error("Invalid Credentials");
                    const isValid = await bcrypt.compare(password, user.password);
                   if (!isValid) throw new Error("Invalid Credentials");
                return user;
             } catch (error) {
                console.error("Login failed", error);                         
                throw new Error(error.message);
             }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
            strategy: "jwt", 
    },
    pages:{
        signIn: "/auth/login",
    },
   callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      await connectToDatabase();
      const sessionUser = await User.findOne({ email:session.user.email});
      session.user.id = sessionUser._id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async signIn({profile})
    {
      console.log("🚀 ~ ~ profile", profile)
      try {
       if(profile)
       { await connectToDatabase();
        const user = await User.findOne({ email: profile.email });
        if(!user){
          const newUser = new User({
            email: profile.email,
            username: profile.name,
            role: "user",
            googlePhoto: profile.picture,
          });
          await newUser.save();
        }}
      return true;
        
      } catch (error) {
        console.log("🚀 ~ ~ error", error)
        return false;
      }

    }
  },

}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };