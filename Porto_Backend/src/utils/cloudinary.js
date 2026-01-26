import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (buffer, folder = "misc", mimetype) => {
  return new Promise((resolve, reject) => {
    const isPDF = mimetype === "application/pdf";

    const options = {
      folder: `portfolio/${folder}`,
      use_filename: true,
      unique_filename: true,
      resource_type: "image",
      format: isPDF ? "pdf" : undefined,
    };

    if (!isPDF) {
      options.transformation = [
        { width: 1200, height: 800, crop: "limit" },
        { quality: "auto:good" },
      ];
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (err, result) => {
        if (err) reject(new Error("Cloudinary upload failed: " + err.message));
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
  } catch (err) {
    throw new Error("Failed to delete Cloudinary asset: " + err.message);
  }
};

export const getPublicIdFromUrl = (url) => {
  try {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (err) {
    return null;
  }
};

export const getAssetsByFolder = async (folderPath) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 100,
    });
    return result.resources;
  } catch (err) {
    throw new Error("Failed to fetch Cloudinary assets: " + err.message);
  }
};

export default cloudinary;
