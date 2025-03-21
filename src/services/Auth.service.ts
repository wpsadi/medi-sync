// Source: src/services/Auth.service.ts
import { handleError } from "@/utils/errorHandler"

import { emailPasswordLoginDef } from "./Auth/emailPassLogin"
import { Registeruserdef } from "./Auth/registeruser"
import { requestRecoveryPasswordDef } from "./Auth/request-pass-recovery"
import { sendVerifyDef } from "./Auth/sendVerify"
import { updateRecoveryPasswordDef } from "./Auth/updatePasswordRecovery"
import { verifyEmailDef } from "./Auth/verifyOTP"



export class Auth{
    static emailPasswordLogin = emailPasswordLoginDef
    static sendVerify = sendVerifyDef
    static verify = verifyEmailDef

    static resendVerify = async ()=>{        // reuse sendVerifyOTP
        try{
            return this.sendVerify()

        }catch(e:unknown){
            return handleError(e,"Unable to request a new OTP")
        }
    }

    static requestRecoveryPassword = requestRecoveryPasswordDef

    static updateRecoveryPassword = updateRecoveryPasswordDef
    static registerUser = Registeruserdef
    
}


