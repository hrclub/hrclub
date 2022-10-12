import { router, TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { signUpSchema } from "validations/auth";
import { Context } from "./context";

export const serverRouter = router<Context>().mutation("sign-up", {
  input: signUpSchema,
  resolve: async function ({ input, ctx }) {
    const { lastname, firstname, username, email, password, verifyPassword } =
      input;

    const exists = await ctx.prisma.user.findFirst({
      where: {
        email,
        username,
      },
    });

    if (password !== verifyPassword) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Password did not match",
      });
    }

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.prisma.user.create({
      data: {
        lastname,
        firstname,
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.username,
    };
  },
});

export type ServerRouter = typeof serverRouter;
