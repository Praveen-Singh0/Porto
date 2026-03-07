import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import { ApiError } from "../utils/ApiErrors.js";

import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const FIELDNAME_FOLDER_MAP = {
  profileImage: "profile",
  document: "documents",
  collageImage: "education",
  minorProject: "minor-projects",
  majorProject: "major-projects",
  aboutImage: "aboutSection",
};

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "image") {
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

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
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: function (req, file, cb) {
      const folder = FIELDNAME_FOLDER_MAP[file.fieldname] ?? "uploads";
      cb(null, `${folder}/${file.originalname}`);
    },
  }),

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
