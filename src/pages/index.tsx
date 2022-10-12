import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function IndexPage() {
  const { data, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "authenticated") {
    return (
      <Button onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}>
        Sign out
      </Button>
    );
  }

  console.log({ data });

  return (
    <div>
      <Link href={"/auth/sign-in"}>signin</Link>
      <Link href={"/auth/sign-up"}>signup</Link>
    </div>
  );
}
