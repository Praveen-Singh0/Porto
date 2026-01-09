import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Image file is required");
  }

  const subfolder = req.query.folder || "misc";

  const cloudinaryResult = await uploadToCloudinary(
    req.file.buffer,
    subfolder
  );

  return res.status(200).json(
    new ApiResponse(200, "Image uploaded successfully", {
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      format: cloudinaryResult.format,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
    })
  );
});
