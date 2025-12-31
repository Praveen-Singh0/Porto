import { z } from "zod";

export const heroSectionSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters long").max(200, "Bio must be at most 200 characters long").optional(),
    profileImageUrl: z.string().url("Profile image must be a valid URL").optional(),
});