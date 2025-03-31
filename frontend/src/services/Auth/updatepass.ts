"use server"
import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

    export const updatePasswordDef = async (oldPassword:string,newPassword:string)=>{
        try{
            const session = await createSession();
    
            if (session.error){
                throw new AppwriteException(session.error)
            }
    
            const account = session.data!.account;
            const result = await account.updatePassword(
                newPassword,
                oldPassword
            );

            return {
                data:result,
                error:undefined
            }
        }catch(e){
            return handleError(e,"Unable to update password")
        }
    }