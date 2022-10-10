import { useSession } from "next-auth/react";

interface AuthProps {
  children: JSX.Element;
}

export default function Auth(props: AuthProps) {
  const { children } = props;
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
