
import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import Logout from "@/components/Logout/Logout";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      {cookies().get('session') == null ? <Link href="/login">Login</Link> : <Logout />}
    </main>
  );
}
