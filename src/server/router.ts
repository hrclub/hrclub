import { router, TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { signUpSchema } from "validations/auth";
import { createPermissionSchema } from "validations/permission";
import { Context } from "./context";

export const serverRouter = router<Context>()
  .mutation("sign-up", {
    input: signUpSchema,
    async resolve({ input, ctx }) {
      const { lastname, firstname, username, email, password, verifyPassword } =
        input;

      const emailExists = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const usernameExists = await ctx.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (usernameExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      if (password !== verifyPassword) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Password did not match",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          lastname: lastname || null,
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
  })
  .mutation("create-permission", {
    input: createPermissionSchema,
    async resolve({ input, ctx }) {
      console.log({ ctx: ctx.session });
      if (!ctx.session) {
        throw new TRPCError({
          message: "Unauthorized",
          code: "UNAUTHORIZED",
        });
      }

      const { name, description } = input;

      const exists = await ctx.prisma.permission.findUnique({
        where: {
          name,
        },
      });

      if (exists) {
        throw new TRPCError({
          message: "Permission already exists",
          code: "CONFLICT",
        });
      }

      const result = await ctx.prisma.permission.create({
        data: {
          name,
          description: description || "",
          createdBy: ctx.session.id,
        },
      });

      return {
        result,
        message: "Permission created successfully",
        status: 201,
      };
    },
  })
  .query("get-permissions", {
    async resolve({ ctx }) {
      return await ctx.prisma.permission.findMany({
        orderBy: {
          name: "asc",
        },
      });
    },
  });

export type ServerRouter = typeof serverRouter;
