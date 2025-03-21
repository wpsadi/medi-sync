"use server"
import { revalidatePath } from "next/cache";
import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

import { AuthSession } from "../AuthSession.service";

export const logoutdef = async ()=>{

    try{
        const session = await createSession();

        if (session.error){
            throw new AppwriteException(session.error)
        }

        const account = session.data!.account;
        const result = await account.deleteSession("current");

        // attempting to rmeove the cookie
        const result2 = await AuthSession.removeSessionToken()

        if (result2.error){
            return {
                data:undefined,
                error:`Session deleted still issue : ${result2.error} `
            }
        }

        revalidatePath("/dashboard","layout")

        return {
            data:result,
            error:undefined
        }
    }catch(e:unknown){
        return handleError(e,"Unable to logout")
    }
}