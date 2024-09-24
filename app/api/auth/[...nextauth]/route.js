import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from '@/database/index'
import User from '@/database/user.modal'
import NextAuth from "next-auth/next";


export const authOptions ={
     secret: "my-secret-123",
    providers: [
        Credentials({
    name: "Credentials",
      id: "credentials",
            credentials: {
        //        email: {
        //   label: "Email",
        //   type: "email",
        //   placeholder: "john.doe@example.com",
        // },
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "********",
        // },  
        email: {},
        username: {},
            },
       
            async authorize(credentials) {
             try {
                
                if (!credentials || !credentials.password || !credentials.email) return null;
                await connectToDatabase();
                console.log("credentials", credentials);
                const { email, password } = credentials;
                const user
                = await  User.findOne({ email });
                if (!user) throw new Error("No user found");
                    const isValid = bcrypt.compare(password, user.password);
                   if (!isValid) return null;
                return user;
             } catch (error) {
                console.error("Login failed", error);
                return error
             }
            }
        })
    ],
    session: {
            strategy: "jwt", 
    },
    pages:{
        signIn: "/auth/login",
 
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session(session, token) {
            session.id = token.id;
            return session;
        },
    },
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };