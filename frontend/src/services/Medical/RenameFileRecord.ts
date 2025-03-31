"use server"

import { ssrAxios } from "@/axios/ssrAxios";
import { handleError } from "@/utils/errorHandler"


export const RenameMedicalFileDef =  async (recordId:string,rename:string)=>{
    try{

        const  response = await ssrAxios.post<{
            success:boolean;
            message:string
            data:unknown
        }>(`medical/renameRecord/${recordId}`,{
            rename

        })

        if (!response.data){
            throw new Error("Request failed for record in bsckend")
        }

        if (!response.data.success){
            throw new Error(response.data.message)
        }

        return {
            error:undefined,
            data:"Added user to backend"
        }

    }catch(e){
        return handleError(e,"Unable to regiuster user in Backend");
    }

}