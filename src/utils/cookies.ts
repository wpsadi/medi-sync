"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import { handleError } from "./errorHandler";



export const Cookies = async () => {
    return await cookies();
}

export const setCookie = async (name: string, value: string, options: Partial<ResponseCookie>) => {
    try {

        const cookieStore = await cookies();
        cookieStore.set(name, value, options);
        return {
            data: value,
            error: undefined
        };

    } catch(e:unknown){
        return handleError(e,`Unable to set cookie ${name}`)}

}

export const getCookie = async (name: string) => {
    try    {
        const cookieStore = await cookies();
    const token = await cookieStore.get(name)?.value ?? "";
    return {
        data: token,
        error: undefined
    };
    }catch(e:unknown){
        return handleError(e,`Unable to get cookie ${name}`)}
      
    
}

export const removeCookie = async (name: string) => {
    try{
        const cookieStore = await cookies();
    await cookieStore.delete(name);

    return {
        data: true,
        error: undefined
    };
    }catch(e:unknown){
        return handleError(e,`Unable to remove cookie ${name}`)}
}