"use server";

import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";




export const userPrefsDef = async ()=>{
    try{
        const session = await createSession();
    
        if (session.error){
            throw new AppwriteException(session.error)
        }


        // try to get PREFS
        const prefs = await session.data!.account.getPrefs<{
            onboarding:boolean
        }>();

        if (!prefs.onboarding){
            prefs.onboarding = false;
        }

        return {
            data:prefs,
            error:undefined
        }
        
    }catch(e){
        return handleError(e,"Unable to load user preferences")
    }
}