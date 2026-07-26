"use client"
import Image from "next/image";
import RegisterPage from "./register/page";
import FileUpload from "./Components/FileUpload";
import { apiClient } from "@/lib/api-client";
// import { Video } from '@imagekit/next';
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        async function loadVideos() {
          const data = await apiClient.getVideos();
          console.log(data,"check video data")
          setVideos(data);
        }

        loadVideos();
      }, []);

  return (
    <>
  
      // let videos = apiClient.getVideos()

     { videos?.map((video : any, ind) => (
         <div key = {ind}>
            <h1 > {video.videoUrl} </h1>
              <Image
                key={ind}
                src={video.videoUrl}
                alt={video.title}
                width={300}
                height={180}
                className="rounded-lg"
            /></div>
      ))}
    
    <h1>Hello world</h1>
    <RegisterPage />
    <FileUpload 
      // fileType="video"
      // onSuccess={handleUploadSuccess}
    />
    </>
  );
}
