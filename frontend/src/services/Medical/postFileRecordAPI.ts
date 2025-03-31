"use server"

import { revalidatePath } from "next/cache";

import { ssrAxios } from "@/axios/ssrAxios";
import { handleError } from "@/utils/errorHandler"

import { sessionDef } from "../Auth/session";


export const POSTMedicalFileDef =  async (fdata:FormData)=>{
    try{

        const {data,error} = await sessionDef()

        if (error){
            throw new Error(error)
        }
        if (!data){
            throw new Error("Unable to load data")
        }

        fdata.append("userId",data.userId)

        console.log(fdata)


        const  response = await ssrAxios.postForm<{
            success:boolean;
            message:string
            data:unknown
        }>("medical/uploadRecord",fdata)

        if (!response.data){
            throw new Error("Request failed for record in bsckend")
        }

        if (!response.data.success){
            throw new Error(response.data.message)
        }

        revalidatePath("/[locale]/dashboard/documents")



        return {
            error:undefined,
            data:"Added file to backend"
        }

    }catch(e){
        return handleError(e,"Unable to add file in Backend");
    }

}