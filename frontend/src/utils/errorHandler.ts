import { isAxiosError } from "axios"
import { AppwriteException } from "node-appwrite"

export const handleError = (err:unknown,message:string)=>{

    // handling for axios errors

    if (isAxiosError(err)){
        console.log(err.response?.data)
        const error = err.response?.data?.message as string | object ?? err.response?.data?.error as string

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ( (typeof error === "object" && error !== null) && (error as any).name === "ZodError"){
            // this means we have a zod error and we have array if issues and we return only the message in first issue
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const issues = (error as any).issues

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const firstIssue = issues[0] as any

            console.log(firstIssue)


            return {
                data:undefined,
                error:firstIssue.message
            }


        }


        const message = err.response?.data?.message as string ?? err.message as string

        return {
            data:undefined,
            error:message}
    }


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