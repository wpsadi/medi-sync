"use server";

import { chatAxios } from "@/axios/chataxios";
import { handleError } from "@/utils/errorHandler";

export const getChatIdsDef = async () => {
    try{
        const response = await chatAxios.get<
            {
                data?: {
                    chatId: string;
                    starting: boolean;
                }[];
                error?: string;
            }
        >("chats");

        if(response.data.error){
            throw new Error(response.data.error);
        }

        if(!response.data.data){
            throw new Error("No chat ids found");
        }

        return {
            data: response.data.data!,
            error: undefined
        }



    }catch(e){
        return handleError(e, "unable to fetch chat ids");
    }
}