import { z } from "zod";

export const createPermissionSchema = z.object({
  name: z.string().trim().min(2).max(255),
  description: z.string().trim().optional().or(z.literal("")),
});

export type CreatePermissionSchema = z.infer<typeof createPermissionSchema>;
