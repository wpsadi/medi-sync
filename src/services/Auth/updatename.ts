"use server"
import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

    export const updateNameDef = async (newName:string)=>{
        try{
            const session = await createSession();
    
            if (session.error){
                throw new AppwriteException(session.error)
            }
    
            const account = session.data!.account;

            const result = await account.updateName(
                newName
            );

            return {
                data:result,
                error:undefined
            }
        }catch(e){
            return handleError(e,"Unable to update name")
        }
    }