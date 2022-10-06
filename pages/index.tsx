import { useSession } from "next-auth/react";
import styles from "styles/Home.module.css";
import Switch from "@mui/material/Switch";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function IndexPage() {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  const { data: session } = useSession();

  console.log({ session });

  return (
    <div className={styles.container}>
      <Link href={"/ssr"}>ssr</Link>
      <Link href={"/csr"}>csr</Link>
      <Link href={"/api/auth/signin"}>signin</Link>

      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
    </div>
  );
}
