"use server"
import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

    export const meDef = async ()=>{
        
        try{
            const session = await createSession();
    
            if (session.error){
                throw new AppwriteException(session.error)
            }
    
            const user = await session.data!.account.get();
            return {
                data:user,
                error:undefined
            }
        }catch(e:unknown){
            return handleError(e,"Unable to load user profile")}
    }