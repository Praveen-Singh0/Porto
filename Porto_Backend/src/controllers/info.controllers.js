import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { prisma } from "../../lib/prisma.js";


const createInfo = asyncHandler(async (req, res) => {
    const {email, phone, profileImage, location, socialLinks} = req.body;

   const info = await prisma.portfolioInfo.upsert({
    where: { id: 1 },
    update: {
      email,
      phone,
      profileImage,
      socialLinks,
      location
    },
    create: {
      id: 1,
      email,
      phone,
      profileImage,
      socialLinks,
      location
    }
  });


    return res.status(201).json(new ApiResponse(201, "Info created successfully", info));
})

const getInfo = asyncHandler(async (req, res) => {
    const info = await prisma.portfolioInfo.findUnique({
      where: { id: 1 }
    });
    if (!info) {
        return res.status(404).json(new ApiError(404, "Info not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Info retrieved successfully", info));
});

const deleteInfo = asyncHandler(async(req, res) => {
    const info = await prisma.portfolioInfo.deleteMany();
    if (!info) {
        return res.status(404).json(new ApiError(404, "Info not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Info deleted successfully", info));
})





const updateInfo = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    throw new ApiError(400, "At least one field is required to update");
  }
  const existingInfo = await prisma.portfolioInfo.findUnique({
    where: { id: 1 },
  });

  if (!existingInfo) {
    throw new ApiError(404, "Portfolio info not found");
  }

  const info = await prisma.portfolioInfo.update({
    where: { id: 1 },
    data: req.body,
  });

  return res.status(200).json(
    new ApiResponse(200, "Portfolio info updated successfully", info)
  );
});



export { createInfo, getInfo, deleteInfo, updateInfo };
