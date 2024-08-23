'use server'
import { jwtDecode } from "jwt-decode";
import { SessionData, CustomJwtPayload, encrypt, decrypt } from "./lib";
import { cookies } from 'next/headers';

export async function setSessionData(token: string) {
    const decoded: CustomJwtPayload = jwtDecode(token);
    const sessionData: SessionData = {
        userId: decoded.id,
        username: decoded.username,
        email: decoded.sub,
        role: decoded.role,
        exp: decoded.exp,
        token: token,
    };
    return sessionData;
}

export async function setSessionCookies(sessionData: SessionData) {
    const encryptedSessionData: string = encrypt(sessionData);
        cookies().set('session', encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })
}

export async function getSessionData(cryptedSession: any) {
    const decryptedSessionData: SessionData = decrypt(cryptedSession);
    return decryptedSessionData
}

export async function removeSessionCookies() {
    cookies().delete('session');
}

export async function removeSessionData() {
    return {
        userId: null,
        username: null,
        email: null,
        role: null,
        exp: null,
        token: null,
    }
}