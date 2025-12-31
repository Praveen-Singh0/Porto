import { z } from "zod";

export const educationSectionSchema = z.object({
  link: z.string().url("Link must be a valid URL").optional(),
  collageImage: z.string().url("CollageImage must be a valid URL").optional(),
  collageName: z.string().max(100, "CollageName must be at most 100 characters long").optional(),
  course: z.string().max(100, "Course must be at most 100 characters long").optional(),
  duration: z.string().max(100, "Duration must be at most 100 characters long").optional(),
  subjects: z.array(
    z.object({
      name: z.string().max(100, "Subject name must be at most 100 characters long"),
    })
  ).optional(),
});

export const educationSectionUpdateSchema = educationSectionSchema;
