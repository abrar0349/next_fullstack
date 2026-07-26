import { connectToDataBase } from "@/lib/bd";
import User from "@/models/Users";
// import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const {email , password} = await request.json()

        if(!email || !password){
           return NextResponse.json(
                {error : "Email and Password are required"},
                {status:400},
            )
        }

        await connectToDataBase()

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error : "User already registered"},
                {status:400},
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
                {message : "User registered successfully"},
                {status: 201},
            )
    }catch(error){

        console.log("Registeration error",error)

        return NextResponse.json(
                {error : error instanceof Error ? error.message : "Unknown Error"},
                {status:400},
            )
    }
}