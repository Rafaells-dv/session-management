import { JwtPayload } from "jwt-decode";
import CryptoJS from 'crypto-js';

export interface SessionData {
    userId?: number;
    username?: string;
    email?: string;
    role?: Array<string>;
    exp?: number;
    token?: string;
}

export interface CustomJwtPayload extends JwtPayload {
    id: number;
    username: string;
    role: Array<string>;
}

const key: string = process.env.CRYPTO_KEY || '';

export const encrypt = (data: object): string  => {
    const encryptedData: string = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return encryptedData
}

export const decrypt = (encryptedData: any): SessionData => {
    var bytes = CryptoJS.AES.decrypt(encryptedData, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

