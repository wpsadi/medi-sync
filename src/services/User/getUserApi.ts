"use server"

import { ssrAxios } from "@/axios/ssrAxios"
import { handleError } from "@/utils/errorHandler"

import { meDef } from "../Auth/me";

type ApiResponse = {
    success: boolean;
    message: string;
    data?:CombinedUserData
  };
  
export  type CombinedUserData = {
    id: string;
    name: string;
    email: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone: string;
    dateOfBirth: string;
    createdAt: string;
    addressDetails: AddressDetails;
    aadhaarDetails: AadhaarDetails;
    medicalInformation: MedicalInformation;
    medicalRecords: MedicalRecord[];
    qrCode: QRCode;
  };
  
  type AddressDetails = {
    id: string;
    userId: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  
  type AadhaarDetails = {
    id: string;
    userId: string;
    aadhaarHash: string;
  };
  
  type MedicalInformation = {
    id: string;
    userId: string;
    bloodGroup: string;
    allergies: string[];
    chronicConditions: string[];
    currentMedications: string[];
  };
  
  type MedicalRecord = {
    id: string;
    userId: string;
    fileName: string;
    testType: string;
    hospitalName: string;
    visitDate: string;
    fileUrl: string;
    description: string;
    isConfidential: boolean;
  };
  
  type QRCode = {
    id: string;
    userId: string;
    qrCodeData: string;
  };
  

export const getUserAPIDef = async (userId?:string)=>{
    try{
      const {data,error} = await meDef()
      
      if (error){
          throw new Error(error)

      }

      if (!userId){
          userId = data!.$id
      }

        const response = await ssrAxios.get
        <ApiResponse>(`user/${userId}`);

        
        if (!response.data){
            throw new Error("Request failed for getting user in bsckend")
        }

        if (!response.data.success){
            throw new Error(response.data.message)
        }

        return {
            error:undefined,
            data:response.data.data!
        }



    }catch(e){
        return handleError(e,"Can't get user from backend")
    }

}