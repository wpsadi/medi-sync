"use server"

import { ssrAxios } from "@/axios/ssrAxios";
import { handleError } from "@/utils/errorHandler"


export const DELMedicalFileDef =  async (recordId:string)=>{
    try{

        const  response = await ssrAxios.delete<{
            success:boolean;
            message:string
            data:unknown
        }>(`medical/deleteRecord/${recordId}`)

        if (!response.data){
            throw new Error("Request failed for record in bsckend")
        }

        if (!response.data.success){
            throw new Error(response.data.message)
        }

        return {
            error:undefined,
            data:"File deleted Successfullyr"
        }

    }catch(e){
        return handleError(e,"Unable to delte file in Backend");
    }

}