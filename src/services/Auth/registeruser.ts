"use server"
import { ID } from "node-appwrite";

import { createAdminClient} from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

import { sendVerifyDef } from "./sendVerify";


export const Registeruserdef = async (email:string,password:string,name:string)=>{
        try{

            const {data,error}=  await createAdminClient()
            if (error){
                throw new Error(error)
            }

            //console.log(data)
            
            const user = await data!.account.create(ID.unique(),email,password,`${name}`);
            //console.log(user)

            await sendVerifyDef()

            return {
                data:user,
                error:undefined
            }


        }catch(e:unknown){
            return handleError(e,"Unable to register user")
        }
    }