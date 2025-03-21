import { AppwriteException } from "node-appwrite"

export const handleError = (err:unknown,message:string)=>{
    if (err instanceof AppwriteException || err instanceof Error ){
        return {
            data:undefined,
            error:err.message
        }
    }
    return {
        data:undefined,
        error:message ?? "Unable to load something..."
    }
}