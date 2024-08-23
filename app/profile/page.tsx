
import styles from "./page.module.css";
import { SessionData } from "@/app/lib/lib";
import { getSessionData } from "@/app/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

export default async function ProfilePage() {

    const value: string | undefined = cookies().get('session')?.value;

    if (value == undefined) {
        return (
            redirect("/login")
        );
    }

    const user: SessionData = await getSessionData(value);
    


    return (
        <main className={styles.main}>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
            <p>{user.userId}</p>
        </main>
    );
}