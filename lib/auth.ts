import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDataBase } from "./bd";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
      providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),

    CredentialsProvider({
        name : 'Credentials',
        credentials: {
            email: { label: "Email", type: "text", placeholder: "Abrar khan" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
  console.log("1. authorize start");

            if(!credentials?.email || !credentials.password){
                throw new Error("Missing Email or Password")
            }
            try{
                await connectToDataBase()
console.log("2. database connected");

                const user = await User.findOne({email: credentials.email})

                if(!user){
                    throw new Error("User didn't found")
                }
  console.log("3. user =>", user);
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )
  console.log("4. user =>", isValid);
                if(!isValid){
                    throw new Error("Invalid userName or password")
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                }
            }catch(error){
                console.error('Auth Error',error)
                throw error
            }
        },

    })
  ],

  callbacks: {
    async jwt({token, user}){
        if(user){
            token.id = user.id
        }
        return token
    },
    async session({session, token }){
        if(session.user){
            session.user.id = token.id as string
        }
        return session
    },
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET!
}