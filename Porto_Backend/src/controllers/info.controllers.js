import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { prisma } from "../../lib/prisma.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl,
} from "../utils/cloudinary.js";

export const createOrUpdateInfo = asyncHandler(async (req, res) => {
  const { email, phone, location, socialLinks } = req.body;

  const existingInfo = await prisma.portfolioInfo.findUnique({
    where: { id: 1 },
  });

  let profileImageUrl = existingInfo?.profileImage || "";

  if (req.file) {
    if (existingInfo?.profileImage) {
      const oldPublicId = getPublicIdFromUrl(existingInfo.profileImage);
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "profile"
    );

    profileImageUrl = cloudinaryResult.secure_url;
  }

  const info = await prisma.portfolioInfo.upsert({
    where: { id: 1 },
    update: {
      email,
      phone,
      location,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : undefined,
      profileImage: profileImageUrl,
    },
    create: {
      id: 1,
      email,
      phone,
      location,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
      profileImage: profileImageUrl,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Portfolio info saved successfully", info));
});

export const getInfo = asyncHandler(async (req, res) => {
  const info = await prisma.portfolioInfo.findUnique({
    where: { id: 1 },
  });

  if (!info) {
    throw new ApiError(404, "Portfolio info not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Portfolio info retrieved", info));
});
