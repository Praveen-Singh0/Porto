import { ZodError } from "zod";
import { ApiError } from "../utils/ApiErrors.js";

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = [...new Set(error.issues.map((e) => e.message))].join(
        ", "
      );
      throw new ApiError(400, message);
    }
    next(error);
  }
};
