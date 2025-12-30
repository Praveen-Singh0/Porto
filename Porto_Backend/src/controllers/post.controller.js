import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { prisma } from "../../lib/prisma.js";

const createPosts = asyncHandler(async (req, res) => {
  const { title, content, published } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const Post = await prisma.post.create({
    data: {
      title,
      content,
      published,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(200, "Post created succefully", Post));
});

const getPosts = asyncHandler(async (req, res) => {
  const Posts = await prisma.post.findMany();
  res.status(200).json(new ApiResponse(200, "Post fetch successfully", Posts));
});

const deletePosts = asyncHandler(async (req, res) => {
  const postId = Number(req.params.id);

  if (isNaN(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  const Post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!Post) {
    throw new ApiError(404, "Post not found");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully"));
});

export { createPosts, getPosts, deletePosts };
