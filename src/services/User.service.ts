
import { logoutdef } from "./Auth/logout";
import { meDef } from "./Auth/me";
import { sessionDef } from "./Auth/session";
import { updateNameDef } from "./Auth/updatename";
import {  updatePasswordDef } from "./Auth/updatepass";


export class User {
    static session = sessionDef;
    static updateName = updateNameDef;
    static updatePassword = updatePasswordDef;
    static logout = logoutdef;
    static me = meDef
}