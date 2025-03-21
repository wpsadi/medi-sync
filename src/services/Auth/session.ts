"use server"
import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export const sessionDef = async ()=>{
        try{
            const session = await createSession();
    
            if (session.error){
                throw new AppwriteException(session.error)
            }

            // try to get sesion info

            const sessionInfo = await session.data!.account.getSession("current");
            return {
                data:sessionInfo,
                error:undefined
            }
        }catch(e){
            return handleError(e,"Unable to retrieve session")
        }
    }