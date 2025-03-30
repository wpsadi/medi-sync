"use server";

// this  just simply would complete the onboarding process by updating the data
import { AppwriteException } from "node-appwrite";

import { ssrAxios } from "@/axios/ssrAxios";
import { handleError } from "@/utils/errorHandler";

import { meDef } from "../Auth/me";
import { updatePrefs } from "./updatePrefs";

type UserRegistrationResponse = {
    success: boolean;
    message: string;
    data?: UserData & {
        id:string;
    };
  };
  
  type UserData = {
    id: string;
    name: string;
    email: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone: string;
    dateOfBirth: string;
    createdAt: string;
  };
  

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
        const user =await  meDef()

        if (user.error){
            throw new Error(user.error)
        }

        const response = await ssrAxios.post<UserRegistrationResponse>("user/register",{
            ...data,
            fullName:undefined,
            name:data.fullName,
            email:user.data!.email,
            gender : data.gender.toLocaleUpperCase().trim(),
            phone:data.emergencyContact,
            emergencyContact:undefined,
            aadhaarNumber:undefined,
            aadhaarDetails: {
                aadhaarNumber: data.aadhaarNumber
              },
            id : user.data!.$id,
            medicalInformation:{
                chronicConditions: data.chronicConditions.split(","),
                currentMedications: data.currentMedications.split(","),
                allergies: data.allergies.split(","),
                bloodGroup: data.bloodGroup
            },

            // making these undefiend
            chronicConditions:undefined,
            currentMedications:undefined,
            allergies:undefined,
            bloodGroup:undefined,
            addressDetails:{
                address:data.address,
                city:data.city,
                state:data.state,
                pinCode:data.pincode
            },

            // making these undefiend

            address:undefined,
            city:undefined,
            state:undefined,
            pincode:undefined,
            emergencyRelation:undefined,


            dateOfBirth:new Date(data.dateOfBirth).toISOString()



        })

        if (!response.data.success){
            throw new AppwriteException(response.data.message)
        }



        // now update the prefs
        await updatePrefs({
            onboarding:true
        })



        return {
            data:response.data.data!,
            error:undefined
        }

    }catch(e){
        return handleError(e,"Unable to complete onboarding")
    }

}