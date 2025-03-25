"use server"

import { ssrAxios } from "@/axios/ssrAxios";
import { handleError } from "@/utils/errorHandler"


export const POSTMedicalFileDef =  async (data:FormData)=>{
    try{

        const  response = await ssrAxios.postForm<{
            success:boolean;
            message:string
            data:unknown
        }>("medical/uploadRecord",data)

        if (!response.data){
            throw new Error("Request failed for record in bsckend")
        }

        if (!response.data.success){
            throw new Error(response.data.message)
        }



        return {
            error:undefined,
            data:"Added file to backend"
        }

    }catch(e){
        return handleError(e,"Unable to add file in Backend");
    }

}