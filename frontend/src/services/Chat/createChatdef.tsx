"use server";

import { revalidatePath } from "next/cache";

import { chatAxios } from "@/axios/chataxios";
import { handleError } from "@/utils/errorHandler";

export const createChatIdDef= async()=>{
    try{
        const response = await chatAxios.post<{
            data?: string;
            error?:string
        }>("chat/create");

        if(response.data.error){
            throw new Error(response.data.error);
        }

        if(!response.data.data){
            throw new Error("No chat id found");
        }

        revalidatePath("/dashboard/chat");
        
        return {
            data: response.data.data!,
            error: undefined
        }



    }catch(e){
        return handleError(e,"unble to create chat id")
    }
}