import { generateQRAPIDef } from "./backend/qr/generateQRAPI";
import { getOrCreateQRAPIDef } from "./backend/qr/getOrCreateQr";
import { getQRAPIDef } from "./backend/qr/getQRAPI";

export class QR{
    static generateQR = generateQRAPIDef
    static getQR = getQRAPIDef
    static getOrCreateQR = getOrCreateQRAPIDef
}