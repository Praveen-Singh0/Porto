import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl,
} from "../../utils/cloudinary.js";

const createEducation = asyncHandler(async (req, res) => {
  const { link, collageName, course, duration, subjects } = req.body;

  const cloudinaryResult = await uploadToCloudinary(
    req.file.buffer,
    "education"
  );

  const education = await prisma.educationCard.create({
    data: {
      link,
      collageImage: cloudinaryResult.secure_url,
      collageName,
      course,
      duration,
      subjects: JSON.parse(subjects),
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Education created", education));
});




const getEducationSection = asyncHandler(async (req, res) => {
  const education = await prisma.educationCard.findMany();
  if (!education) {
    throw new ApiError(404, "education section not found");
  }

  return res.status(200).json(new ApiResponse(200, "education section retrieved", education));
});


const updateEducationSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { link, collageName, course, duration, subjects } = req.body;

  const existing = await prisma.educationCard.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    throw new ApiError(404, "Education not found");
  }

  let collageImage = existing.collageImage;

  if (req.file) {
    const oldPublicId = getPublicIdFromUrl(existing.collageImage);
    if (oldPublicId) {
      await deleteFromCloudinary(oldPublicId);
    }

    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "education"
    );

    collageImage = cloudinaryResult.secure_url;
  }

  const education = await prisma.educationCard.update({
    where: { id: Number(id) },
    data: {
      link,
      collageImage,
      collageName,
      course,
      duration,
      subjects: subjects ? JSON.parse(subjects) : existing.subjects,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Education updated", education));
});


const deleteEducationSection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.educationCard.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json(
    new ApiResponse(200, "Education section deleted successfully")
  );
});

export { createEducation, getEducationSection, updateEducationSection, deleteEducationSection };

