import { authOptions } from "@/lib/auth";
import { connectToDataBase } from "@/lib/bd";
import video, { IVideo } from "@/models/Video";
// import { Video } from "@imagekit/next";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){

    try{
        await connectToDataBase()

        const videos = await video.find({}).sort({createdAt : -1}).lean()

        if(!videos ||  videos.length === 0){
          return   NextResponse.json([],{status:200})
        }

        return NextResponse.json(videos)

    }catch(error){

        NextResponse.json(
            {error: "Failed to fetch Videos"},
            {status : 500}
        );

    }
    
}


export async function POST(request: NextRequest){

    try{

    console.log("1. POST called");

        const session = await getServerSession(authOptions)
console.log("2. Session:", session);

        if(!session){
             console.log("3. No Session");
           return NextResponse.json(
                {error: "Failed to fetch Videos"},
                {status : 401}
            );
        }
 console.log("4. Before DB");
        await connectToDataBase()
 console.log("5. After DB");
        const body: IVideo = await request.json()
        console.log("Request Body:", body);
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
                return NextResponse.json(
                    {error: "Missing Field is required"},
                    {status : 400}
                );
            }
      
        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? true 
            }
        }

        const newVideo = video.create(videoData)

        return NextResponse.json(newVideo)

    }catch(error){
          return NextResponse.json(
                    {error: "Failed To Create Video"},
                    {status : 500}
                );

    }
}