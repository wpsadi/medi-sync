import { DELMedicalFileDef } from "./Medical/DELFileRecord";
import { GETMedicalFileDef } from "./Medical/GETMedicalFile";
import { POSTMedicalFileDef } from "./Medical/postFileRecordAPI";
import { RenameMedicalFileDef } from "./Medical/RenameFileRecord";

export class Medical {
    static renameFile = RenameMedicalFileDef
    static deleteFile = DELMedicalFileDef
    static uploadFile = POSTMedicalFileDef
    static getFile = GETMedicalFileDef
}