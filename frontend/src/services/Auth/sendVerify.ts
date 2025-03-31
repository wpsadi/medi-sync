"use server"


import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";
import { Url } from "@/utils/Url";

export const sendVerifyDef = async ()=>{

   try{

       const {data,error}=  await createSession()

       if (error){
           throw new Error(error)
       }

       const TokenInfo = await data!.account.createVerification(await Url.extendURL("/auth/verify-email"));

       //console.log(TokenInfo)

       return {
           data:TokenInfo,
           error:undefined
       }




   }catch(e:unknown){
       return handleError(e,"Unable to send OTP at this moment")
   }
}