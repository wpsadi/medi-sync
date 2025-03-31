"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

import { AuthSession } from "../AuthSession.service";


export const emailPasswordLoginDef = async (email:string,password:string)=>{
        try{
            const {data,error}=  await createAdminClient()

            if (error){
                throw new Error(error)
            }

            const session = await data!.account.createEmailPasswordSession(email,password);

            //console.log(session)

            const {secret} = session

            await AuthSession.setSessionToken(secret)

            revalidatePath("/auth")

     


            return {
                data:session,
                error:undefined
            }



            


        }catch(e:unknown){
            return handleError(e,"Unable to login")
        }
    }