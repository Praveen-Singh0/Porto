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
  const { bio, specialization, education } = req.body;

  let existing = await prisma.aboutSection.findUnique({
    where: { id: 1 },
  });

  let imageUrl = existing?.imageUrl || "";

  if (req.files?.image?.[0]) {
    const imageFile = req.files.image[0];

    if (existing?.imageUrl) {
      const oldPublicId = getPublicIdFromUrl(existing.imageUrl);
      if (oldPublicId) await deleteFromCloudinary(oldPublicId);
    }

    const uploadedImg = await uploadToCloudinary(
      imageFile.buffer,
      "image",
      imageFile.mimetype,
    );

    imageUrl = uploadedImg.secure_url;
  }

  let documentObj = existing?.documents || null;

  if (req.files?.document?.[0]) {
    const pdfFile = req.files.document[0];

    if (existing?.documents?.fileUrl) {
      const oldPublicId = getPublicIdFromUrl(existing.documents.fileUrl);
      if (oldPublicId) await deleteFromCloudinary(oldPublicId);
    }

    const uploadedPDF = await uploadToCloudinary(
      pdfFile.buffer,
      "documents",
      pdfFile.mimetype,
    );

    documentObj = {
      title: req.body.title || existing?.documents?.title || "",
      fileUrl: uploadedPDF.secure_url,
    };
  }

  const updated = await prisma.aboutSection.upsert({
    where: { id: 1 },
    update: {
      bio,
      specialization,
      education,
      imageUrl,
      documents: documentObj,
    },
    create: {
      id: 1,
      bio,
      specialization,
      education,
      imageUrl,
      documents: documentObj,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "About section updated", updated));
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
