import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";

const createEducation = asyncHandler(async (req, res) => {
  const { link, collageImage, collageName, course, duration, subjects } = req.body;

  const education = await prisma.educationCard.create({
    data: {
      link,
      collageImage,
      collageName,
      course,
      duration,
      subjects,
    },
  });

  return res.status(201).json(new ApiResponse(201, "education section created", education));
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
  const { link, collageImage, collageName, course, duration, subjects } = req.body;

  const education = await prisma.educationCard.update({
    where: { id: Number(id) },
    data: {
      link,
      collageImage,
      collageName,
      course,
      duration,
      subjects,
    },
  });

  return res.status(200).json(new ApiResponse(200, "education section updated", education));
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

