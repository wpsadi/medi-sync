
import { logoutdef } from "./Auth/logout";
import { meDef } from "./Auth/me";
import { sessionDef } from "./Auth/session";
import { updateNameDef } from "./Auth/updatename";
import {  updatePasswordDef } from "./Auth/updatepass";
import { completeOnboardingDef } from "./User/completeOnboarding";
import { getUserAPIDef } from "./User/getUserApi";
import { isOnboardingCompletedDef } from "./User/isOnboardingCompleted";


export class User {
    static session = sessionDef;
    static updateName = updateNameDef;
    static updatePassword = updatePasswordDef;
    static logout = logoutdef;
    static me = meDef;
    static isOnboardingCompleted = isOnboardingCompletedDef;
    static completeOnboarding  = completeOnboardingDef;
    static getUserData = getUserAPIDef;
}