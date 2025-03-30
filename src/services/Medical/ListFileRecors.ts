"use server";

import { handleError } from "@/utils/errorHandler";

import { getUserAPIDef } from "../User/getUserApi";

export const ListFileRecordsDef = async () => {
   try{
        const {data,error} = await getUserAPIDef()
        if (error){
            throw new Error(error)
        }
        if (!data){
            throw new Error("Unable to load data")
        }

        const files = data.medicalRecords || []



      


        return {
            error:undefined,
            data:files
        }
   }

    catch(e){
          return handleError(e,"Unable to load file records in backend")
    }


}