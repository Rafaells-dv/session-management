'use client';
import axios from "axios";
import styles from "./LoginForm.module.css";
import {setSessionData, setSessionCookies} from "@/app/lib/actions";

export default function LoginForm() {

    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const login = form.email.value;
        const password = form.password.value;
        try {
            const response = await axios.post("http://localhost:8080/auth/login", { login, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const { token } = response.data;
                const session = await setSessionData(token)
                await setSessionCookies(session);
                window.location.href = "/profile";
            } else {
                alert("Login failed");
            }
        } catch (error) {
            alert("Login failed");
        }
    }

    return (
    <form className={styles.form} onSubmit={login}>
        <input type="email" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <button type="submit">Login</button>
    </form>
    )
}