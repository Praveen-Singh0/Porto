import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";
import { deleteFromS3 } from "../../utils/s3Client.js";

export const createMinorProject = asyncHandler(async (req, res) => {
  const { header, html_url, content } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Project image is required");
  }

  const project = await prisma.minorProject.create({
    data: {
      header,
      html_url,
      image: req.file.location,
      content,
      type: "minor",
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Minor project created successfully", project));
});

export const getAllMinorProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.minorProject.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Minor projects retrieved successfully", projects)
    );
});

export const getMinorProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await prisma.minorProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!project) {
    throw new ApiError(404, "Minor project not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Minor project retrieved successfully", project)
    );
});

export const updateMinorProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { header, html_url, content } = req.body;

  if (!header && !html_url && !content && !req.file) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const existingProject = await prisma.minorProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingProject) {
    throw new ApiError(404, "Minor project not found");
  }

  const updateData = {
    ...(header && { header }),
    ...(html_url && { html_url }),
    ...(content && { content }),
  };

  if (req.file) {
    if (existingProject.image) {
      await deleteFromS3(existingProject.image);
    }

    updateData.image = req.file.location;
  }

  const updatedProject = await prisma.minorProject.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Minor project updated successfully", updatedProject)
    );
});

export const deleteMinorProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProject = await prisma.minorProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingProject) {
    throw new ApiError(404, "Minor project not found");
  }

  if (existingProject.image) {
    await deleteFromS3(existingProject.image);
  }

  await prisma.minorProject.delete({
    where: { id: parseInt(id) },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Minor project deleted successfully", null));
});