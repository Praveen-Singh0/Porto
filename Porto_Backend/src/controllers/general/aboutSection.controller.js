import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl,
} from "../../utils/cloudinary.js";

const createAbout = asyncHandler(async (req, res) => {
  const { bio, specialization, education, documents } = req.body;

  const existing = await prisma.aboutSection.findUnique({
    where: { id: 1 },
  });

  let imageUrl = existing?.imageUrl || "";

  // ✅ If new image uploaded
  if (req.file) {
    // delete old image
    if (existing?.imageUrl) {
      const oldPublicId = getPublicIdFromUrl(existing.imageUrl);
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "about"
    );

    imageUrl = cloudinaryResult.secure_url;
  }

  const about = await prisma.aboutSection.upsert({
    where: { id: 1 },
    update: {
      bio,
      specialization,
      education,
      documents: documents ? JSON.parse(documents) : [],
      imageUrl,
    },
    create: {
      id: 1,
      bio,
      specialization,
      education,
      documents: documents ? JSON.parse(documents) : [],
      imageUrl,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "About section updated", about));
});

const getAboutSection = asyncHandler(async (req, res) => {
  const about = await prisma.aboutSection.findUnique({
    where: { id: 1 },
  });

  if (!about) {
    throw new ApiError(404, "About section not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "About section retrieved", about));
});

export { createAbout, getAboutSection };
