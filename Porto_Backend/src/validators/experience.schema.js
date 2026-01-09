import { z } from "zod";

export const experienceSectionSchema = z.object({
  title: z.string().min(2).max(100),  //test this max thing
  company: z.string().min(2).max(100).optional(),
  location: z.string().min(2).max(100).optional(),
  duration: z.string().min(2).max(100).optional(),
  period: z.string().min(2).max(100).optional(),
  type: z.string().min(2).max(100).optional(),
  responsibilities: z.array(z.string().min(2).max(300)).optional(),
  technologies: z.array(z.string().min(2).max(100)).optional(),
  color: z.string().min(2).max(100).optional(),
});

