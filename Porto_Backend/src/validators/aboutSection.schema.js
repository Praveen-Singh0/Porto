import { z } from "zod";

export const aboutSectionSchema = z.object({
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(300, "Bio must be at most 300 characters long").optional(),
  imageUrl: z.string().url("ImageUrl must be a valid URL").optional(),
  specialization: z
    .string()
    .max(100, "Specialization must be at most 100 characters long").optional(),
  education: z
    .string()
    .max(100, "Education must be at most 100 characters long").optional(),
  documents: z.array(
    z.object({
      title: z.string().max(50).optional(),
      fileUrl: z.string().url().optional(),
    })
  ).optional(),
});
