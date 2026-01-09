import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file buffer to Cloudinary in portfolio folder
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} subfolder - Subfolder inside portfolio (e.g., 'minor-projects', 'major-projects')
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = (fileBuffer, subfolder = "projects") => {
  return new Promise((resolve, reject) => {
    // Folder structure: portfolio/minor-projects or portfolio/major-projects
    const folderPath = `portfolio/${subfolder}`;
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath, // Upload to portfolio folder
        resource_type: "auto",
        transformation: [
          { width: 1200, height: 800, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
        // Optional: Generate unique filename
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Cloudinary public ID (includes folder path)
 * @returns {Promise<Object>}
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true, // Invalidate CDN cache
    });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - Public ID with folder path
 * 
 * Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/portfolio/minor-projects/image.jpg
 * Returns: portfolio/minor-projects/image
 */
export const getPublicIdFromUrl = (url) => {
  try {
    // Match pattern: /upload/v{version}/{folder}/{filename}.{ext}
    const regex = /\/upload\/(?:v\d+\/)?(.*)\.(jpg|jpeg|png|gif|webp|svg)$/i;
    const match = url.match(regex);
    
    if (match && match[1]) {
      return match[1]; // Returns full path: portfolio/minor-projects/image
    }
    
    return null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

/**
 * Get all assets from a specific folder
 * @param {string} folderPath - Folder path (e.g., 'portfolio/minor-projects')
 * @returns {Promise<Array>}
 */
export const getAssetsByFolder = async (folderPath) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 100,
    });
    return result.resources;
  } catch (error) {
    throw error;
  }
};

export default cloudinary;
