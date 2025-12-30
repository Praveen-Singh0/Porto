import { z } from "zod";

export const portfolioInfoSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  phone: z
    .string()
    .min(14, "Phone number should look like +91-1234567890")
    .optional(),
  location: z.string().optional(),
  profileImage: z.string().url("Profile image must be a valid URL").optional(),
  socialLinks: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
});

export const updatePortfolioInfoSchema = z
  .object({
    email: z.string().email("Invalid email format").optional(),
    phone: z
      .string()
      .min(14, "Phone number should look like +91-1234567890")
      .optional(),
    location: z.string().optional(),
    profileImage: z
      .string()
      .url("Profile image must be a valid URL")
      .optional(),
    socialLinks: z
      .object({
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        twitter: z.string().url().optional(),
        instagram: z.string().url().optional(),
      })
      .optional(),
  })
  .strict(); // ❗ blocks unknown fields
