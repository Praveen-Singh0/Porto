import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";
import { deleteFromS3 } from "../../utils/s3Client.js";

export const createMajorProject = asyncHandler(async (req, res) => {
  const { title, description, liveUrl, githubUrl, technologies } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Project image is required");
  }

  const project = await prisma.majorProject.create({
    data: {
      title,
      description,
      image: req.file.location,
      liveUrl,
      githubUrl: githubUrl || null,
      technologies,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Major project created successfully", project));
});

export const getAllMajorProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.majorProject.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Major projects retrieved successfully", projects),
    );
});

export const updateMajorProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, liveUrl, githubUrl, technologies } = req.body;

  if (
    !title &&
    !description &&
    !liveUrl &&
    !githubUrl &&
    !technologies &&
    !req.file
  ) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const existingProject = await prisma.majorProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingProject) {
    throw new ApiError(404, "Major project not found");
  }

  const updateData = {
    ...(title && { title }),
    ...(description && { description }),
    ...(liveUrl && { liveUrl }),
    ...(githubUrl !== undefined && { githubUrl: githubUrl || null }),
  };

  if (technologies) {
    let techArray = technologies;
    if (typeof technologies === "string") {
      try {
        techArray = JSON.parse(technologies);
      } catch (error) {
        throw new ApiError(400, "Technologies must be a valid JSON array");
      }
    }

    updateData.technologies = techArray;
  }

  if (req.file) {
    if (existingProject.image) {
      await deleteFromS3(existingProject.image);
    }

    updateData.image = req.file.location;
  }

  const updatedProject = await prisma.majorProject.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Major project updated successfully",
        updatedProject,
      ),
    );
});

export const deleteMajorProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProject = await prisma.majorProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingProject) {
    throw new ApiError(404, "Major project not found");
  }

  if (existingProject.image) {
    await deleteFromS3(existingProject.image);
  }

  await prisma.majorProject.delete({
    where: { id: parseInt(id) },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Major project deleted successfully", null));
});
