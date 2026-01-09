import { z } from "zod";

export const minorProjectSchema = z.object({
  header: z
    .string()
    .min(2, "Header must be at least 2 characters")
    .max(100, "Header too long"),

  html_url: z
    .string()
    .url("HTML URL must be a valid URL"),

  content: z
    .string()
    .min(5, "Content must be at least 5 characters")
    .max(1000, "Content too long"),
});

export const updateMinorProjectSchema = minorProjectSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required to update" }
  );

