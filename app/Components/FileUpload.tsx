"use client" // This component must be a client component

import { apiClient } from "@/lib/api-client";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface fileUpload{
    onSuccess: (response: any) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video"
}

const FileUpload = ({onSuccess = () => {
    alert("image uploaded successfully")
}, onProgress, fileType}:fileUpload) => {
    
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)

  
    const validateFile = (file: File) => {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please select a valid video file.");
            }
        }

         if(file.size > 100 * 1024 * 1024){ // 100MB
            setError("File size exceeds the 100MB limit.");
        }

        return true
    }


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if(!file || !validateFile(file)) return;

        setUploading(true);
        setError(null);

        try{

           const authRes = await fetch("/api/auth/imagekit_auth");
           console.log(authRes,'authRes')
           const auth = await authRes.json();
           console.log("Auth Data:", auth);

           const res = await upload(
                {
                    // Authentication parameters
                    file,
                    fileName: file.name, 
                    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                    // signature: auth.signature,
                    // expire: auth.expire,
                    // token: auth.token,
                     token: auth.authenticationParameters.token,
                        signature: auth.authenticationParameters.signature,
                        expire: auth.authenticationParameters.expire,
                    onProgress: (event) => {
                        if(event.lengthComputable && onProgress){
                            const percentage = (event.loaded / event.total) * 100
                            onProgress(Math.round(percentage));
                        };
                    },
           })

           onSuccess(res);
           console.log("ImageKit Response:", res);
           const payload = {
                title: "Test Video",
                description: "Testing upload",
                videoUrl: res.url!,
                thumbnailUrl: "temp-thumbnail",
            };

            console.log("Payload:", payload);

           await apiClient.createVideo(payload)

        }catch (error) {
            console.error("Upload failed:", error);
            
        }finally{
            setUploading(false);
        }


    }
    return (
     <>
  <div className="mx-auto w-full max-w-sm sm:max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg mt-3">
    <label className="mb-3 block text-lg font-semibold text-gray-800">
      {fileType === "video" ? "Upload Video" : "Upload Image"}
    </label>

    <input
      type="file"
      accept={fileType === "video" ? "video/*" : "image/*"}
      onChange={handleFileChange}
      className="
        block w-full cursor-pointer rounded-lg border border-gray-300
        bg-gray-50 text-sm text-gray-700
        file:mr-4 file:cursor-pointer file:rounded-md
        file:border-0 file:bg-emerald-600
        file:px-4 file:py-2
        file:font-medium file:text-white
        hover:file:bg-emerald-700
        focus:outline-none
      "
    />

    {uploading && (
      <div className="mt-4 flex items-center gap-2 text-emerald-600">
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        <span className="font-medium">Uploading...</span>
      </div>
    )}
  </div>
</>
    );
};

export default FileUpload;