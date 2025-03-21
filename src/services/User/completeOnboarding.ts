"use server";

// this  just simply would complete the onboarding process by updating the data
import { AppwriteException } from "node-appwrite";

import { ssrAxios } from "@/axios/ssrAxios";
import { handleError } from "@/utils/errorHandler";

import { updatePrefs } from "./updatePrefs";

// {
    
        // fullName: "",
        // dateOfBirth: "",
        // gender: "",
        // bloodGroup: "",
        // address: "",
        // city: "",
        // state: "",
        // pincode: "",
        // aadhaarNumber: "",
        // emergencyContact: "",
        // emergencyRelation: "",
        // allergies: "",
        // chronicConditions: "",
        // currentMedications: "",
      
// }
export const completeOnboardingDef = async (data:{
    id:string
    fullName: string,
    dateOfBirth: string,
    gender: string,
    bloodGroup: string,
    address: string,
    city: string,
    state: string,
    pincode: string,
    aadhaarNumber: string,
    emergencyContact: string,
    emergencyRelation: string,
    allergies: string,
    chronicConditions: string,
    currentMedications: string,
    

}
)=>{

    try{

        // making api call here

        const response = await ssrAxios.post<{
            success:boolean,
            message:string,
            data?:unknown
        }>("user/register",data)

        if (!response.data.success){
            throw new AppwriteException(response.data.message)
        }



        // now update the prefs
        await updatePrefs({
            onboarding:true
        })



        return {
            data:true,
            error:undefined
        }

    }catch(e){
        return handleError(e,"Unable to complete onboarding")
    }

}