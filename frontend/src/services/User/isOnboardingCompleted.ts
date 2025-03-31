"use server";

import { AppwriteException } from "node-appwrite";

import { handleError } from "@/utils/errorHandler";

import { userPrefsDef } from "./prefs";


export const isOnboardingCompletedDef = async ()=>{
    try{
        const prefs = await userPrefsDef()

        if (prefs.error){
            throw new AppwriteException(prefs.error)
        
        }

        return {
            data:prefs.data!.onboarding,
            error:undefined
        }


    }catch(e){
        return handleError(e,"Unable to load user preferences")
    }
}