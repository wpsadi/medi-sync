"use server";

import { chatAxios } from "@/axios/chataxios";
import { handleError } from "@/utils/errorHandler";


export const deleteChatIdDef = async (chatId: string) => {

    try{

        const response = await chatAxios.delete<{
            data?: string;
            error?:string
        }>(`chats/${chatId}`);

        if(response.data.error){
            throw new Error(response.data.error);
        }

        if(!response.data.data){
            throw new Error("No chat id found");
        }

        return {
            data: response.data.data!,
            error: undefined
        }




    }catch(e){
        return handleError(e,"unble to delete chat id")
    }
}