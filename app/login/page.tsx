'use client';
import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./page.module.css";

export default function LoginPage() {
    return (
        <main className={styles.main}>
            <h1>Login</h1>
            <LoginForm />
        </main>
    );
}