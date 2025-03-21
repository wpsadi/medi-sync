import { i18n } from "../../i18n-config"
import { getCookie, setCookie } from "./cookies"
import { handleError } from "./errorHandler"

export const setLang =  async (lang: string) => {
    try{

        if (i18n.locales.includes(lang) === false) {
            throw new Error("Invalid language")
        }


        await setCookie("lang", lang, {
            priority: "high",
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"

        })

        return {
            data: lang,
            error: undefined
        }
    }catch(e){
        return handleError(e,"Unable to set language")
    }
}


export const getLang = async () => {

    try{
        console.log("Getting lang")

        const lang = (await getCookie("lang")).data || i18n.defaultLocale
        return {
            data: lang,
            error: undefined
        }
    }catch(e){
        return handleError(e,"Unable to get language")
    }   
}

export const removeLang = async () => {
    try{
        await setCookie("lang", "", {
            priority: "high",
            maxAge: 0,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })
        return {
            data: undefined,
            error: undefined
        }
    }catch(e){
        return handleError(e,"Unable to remove language")
    }
}