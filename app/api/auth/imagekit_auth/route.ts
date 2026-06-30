// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
  

  try{
      // const { token, expire, signature } = getUploadAuthParams({
    const authenticationParameters = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
     
    })

    return Response.json({
        //  token, expire, signature,
            authenticationParameters,
             publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY 
        })

  }catch(error){
       return Response.json({
            error : "Authentication failed of imagekit"
           },{
            status: 500
           })
  }

    
}