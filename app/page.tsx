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
     <FileUpload 
        // fileType="video"
        // onSuccess={handleUploadSuccess}
      />
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos?.map((video: any, ind: number) => (
          <div
            key={ind}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <video
              src={video.videoUrl}
              controls
              className="h-56 w-full bg-black object-cover"
            />

            <div className="p-4">
              <h2 className="truncate text-lg font-semibold text-gray-800">
                {video.title}
              </h2>

              <p className="mt-2 break-all text-sm text-gray-500">
                {video.videoUrl}
              </p>
            </div>
          </div>
      ))}
  </div>
    
    {/* <h1>Hello world</h1>
    <RegisterPage /> */}
   
    </>
  );
}
