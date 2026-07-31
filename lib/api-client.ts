import { IVideo } from "@/models/Video";

export type videoFormData = Omit<IVideo , "_id">

type fetchOption = {
    method? : "GET" | "POST" | "PUT" | "DELETE"
    body? : any
    headers? : Record<string , string>
}

class ApiClient { 

    private async fetch<T>(
        endpoint : string,
        options: fetchOption = {}
    ) : Promise<T>{
        const {method = "GET", body , headers = {}} = options

        const defualtHeaders = {
            "Content-Type" : "Application/json",
            ...headers,
        }
        
        // console.log("Request Body:", body);

       const response =  await fetch(`/api${endpoint}`, {
            method,
            headers: defualtHeaders,
            body : body ?  JSON.stringify(body) : undefined,
        })

        if(!response.ok){
            throw new Error( await response.text())
        }
        return response.json()
    }

    async getVideos(){  
        return this.fetch<IVideo[]>("/video");
    }

    async createVideo(videoData : videoFormData){
        
        return this.fetch("/video",{
            method : "POST",
            body : videoData
        })
    }
}

export const apiClient = new ApiClient()