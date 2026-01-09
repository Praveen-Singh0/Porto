import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiErrors.js";

const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const extname = /jpeg|jpg|png|webp/.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.includes(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only image files are allowed"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json(new ApiError(400, "File size exceeds 5MB limit"));
    }
    return res.status(400).json(new ApiError(400, err.message));
  }
  next(err);
};
