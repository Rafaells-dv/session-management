'use client';
import { removeSessionCookies, removeSessionData } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default function Logout() {
    
    function logout() {
        removeSessionCookies();
        removeSessionData();
        redirect("/");
    }

    return (
        <button onClick={() => logout()}>Logout</button>
    );
}