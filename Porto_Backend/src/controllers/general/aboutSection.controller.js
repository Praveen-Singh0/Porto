import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";

const createAbout = asyncHandler(async (req, res) => {
  const { bio, imageUrl, role, specialization, education, documents } = req.body;

  const about = await prisma.aboutSection.upsert({
    where: { id: 1 },
    update: {
      bio,
      imageUrl,
      role,
      specialization,
      education,
      documents,
    },
    create: {
      id: 1,
      bio,
      imageUrl,
      role,
      specialization,
      education,
      documents,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "about section created", about));
});


const getAboutSection = asyncHandler(async (req, res) => {
  const about = await prisma.aboutSection.findUnique({
    where: { id: 1 },
  });

  if (!about) {
    throw new ApiError(404, "about section not found");
  }

  return res.status(200).json(new ApiResponse(200, "about section retrieved", about));
});

export { createAbout, getAboutSection };
