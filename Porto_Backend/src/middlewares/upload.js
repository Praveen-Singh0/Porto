import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiErrors.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "image") {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new ApiError(400, "Only JPG, PNG, WEBP images allowed"));
    }
  }

  if (file.fieldname === "document") {
    if (file.mimetype !== "application/pdf" || ext !== ".pdf") {
      return cb(new ApiError(400, "Only PDF files allowed"));
    }
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json(new ApiError(400, "File upload error: " + err.message));
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err);
  }
  next(err);
};
