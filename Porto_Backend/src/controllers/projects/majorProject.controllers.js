import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiErrors.js";
import { prisma } from "../../../lib/prisma.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl,
} from "../../utils/cloudinary.js";

export const createMajorProject = asyncHandler(async (req, res) => {
  const { title, description, liveUrl, githubUrl, technologies } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Project image is required");
  }

  const cloudinaryResult = await uploadToCloudinary(
    req.file.buffer,
    "major-projects"
  );

  const project = await prisma.majorProject.create({
    data: {
      title,
      description,
      image: cloudinaryResult.secure_url,
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
      new ApiResponse(200, "Major projects retrieved successfully", projects)
    );
});


// Update major project
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

  // Parse technologies if provided
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

  // If new image is uploaded
  if (req.file) {
    // Delete old image from Cloudinary
    const oldPublicId = getPublicIdFromUrl(existingProject.image);
    if (oldPublicId) {
      await deleteFromCloudinary(oldPublicId);
    }

    // Upload new image to portfolio/major-projects
    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "major-projects"
    );
    updateData.image = cloudinaryResult.secure_url;
  }

  const updatedProject = await prisma.majorProject.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Major project updated successfully", updatedProject)
    );
});

// Delete major project
export const deleteMajorProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProject = await prisma.majorProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingProject) {
    throw new ApiError(404, "Major project not found");
  }

  // Delete image from Cloudinary (from portfolio/major-projects folder)
  const publicId = getPublicIdFromUrl(existingProject.image);
  if (publicId) {
    await deleteFromCloudinary(publicId);
  }

  await prisma.majorProject.delete({
    where: { id: parseInt(id) },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Major project deleted successfully", null));
});
