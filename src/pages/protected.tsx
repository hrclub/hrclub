import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface ProtectedProps {
  session: Session;
}

export default function Protected(props: ProtectedProps) {
  const { session } = props;

  console.log({ session });

  return <div>Protected</div>;
}

export function getServerSideProps() {
  const session = getSession();

  return {
    session,
  };
}
