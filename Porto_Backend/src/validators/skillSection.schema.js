import { z } from "zod";

export const skillSectionSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  proficiency: z.number().min(0).max(100).optional(),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "OTHERS"]).optional(),
  icon: z.string().max(100).optional(),
  color: z.string().min(2).max(20).optional(),
});

export const skillSectionUpdateSchema = skillSectionSchema.partial();
