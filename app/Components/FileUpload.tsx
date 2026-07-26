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
           
            <input 
                type="file" 
                accept = {fileType === "video" ? "video/*" : "image/*"}
                onChange = {handleFileChange}
            />
            
            {uploading && <span>Uploading...</span>}
        
        </>
    );
};

export default FileUpload;