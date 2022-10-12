import { nextAuthOptions } from "lib/auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

export const requireAuth = function (func: GetServerSideProps) {
  return async function (ctx: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/auth/sign-in",
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
};
