import { useSession } from "next-auth/react";
import styles from "styles/Home.module.css";
import Switch from "@mui/material/Switch";
import Link from "next/link";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <Link href={"/auth/signup"} className="p-8">
        <a className="p-8 font-mono">a</a>
      </Link>
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
