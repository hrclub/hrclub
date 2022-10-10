import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CSR() {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") return <div>CSR: loading...</div>;

  return <div>CSR: {session?.user.email}</div>;
}

CSR.auth = {
  loading: <div>HEY</div>,
  unauthorized: "/token",
};
