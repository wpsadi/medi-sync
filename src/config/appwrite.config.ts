
import * as sdk from "node-appwrite";

import { AuthSession } from "@/services/AuthSession.service";
import { handleError } from "@/utils/errorHandler";

export const createSession = async () => {
    try {
        const { data: token, error } = await AuthSession.getSessionToken();
        
        // || !token
        if (error ) {
            throw new Error(error || 'Failed to retrieve session token');
        }

        const client = new sdk.Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT as string) // Ensure ENV variables are set
            .setProject(process.env.APPWRITE_PROJECT_ID as string)
            .setSession(token || "");

            return {
                data:{
                    account: new sdk.Account(client),
                    database: new sdk.Databases(client),
                    users: new sdk.Users(client),
                    storage: new sdk.Storage(client),
                    teams: new sdk.Teams(client),
                },
                error:undefined
              
            };
    } catch (e: unknown) {
        return handleError(e, 'Unable to create session');
    }
};


export const createAdminClient = async () => {
    try{
        if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_PROJECT_API_KEY) {
            throw new Error('Missing required environment variables for Appwrite configuration');
        }

        //console.log(process.env.APPWRITE_ENDPOINT)
    
        const client = new sdk.Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
            .setProject(process.env.APPWRITE_PROJECT_ID as string)
            .setKey(process.env.APPWRITE_PROJECT_API_KEY as string);

            //console.log(client)
    
        return {
            data:{
                account: new sdk.Account(client),
                database: new sdk.Databases(client),
                users: new sdk.Users(client),
                storage: new sdk.Storage(client),
                teams: new sdk.Teams(client),
            },
            error:undefined
          
        };
    }catch(e:unknown){
        return handleError(e,"Unable to create admin instance")
    }
};
