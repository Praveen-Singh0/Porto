import { z } from "zod";

export const createMajorProjectSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),

  liveUrl: z
    .string()
    .url("Live URL must be a valid URL"),

  githubUrl: z
    .string()
    .url("GitHub URL must be a valid URL")
    .optional()
    .or(z.literal("")),

  technologies: z
    .string()
    .transform((val, ctx) => {
      try {
        const parsed = JSON.parse(val);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Technologies must be a non-empty array",
          });
          return z.NEVER;
        }
        return parsed;
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Technologies must be valid JSON array",
        });
        return z.NEVER;
      }
    }),
});


export const updateMajorProjectSchema =
  createMajorProjectSchema.partial();
