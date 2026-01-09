import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiErrors.js'
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Helper function to generate JWT
const generateAccessToken = (userId) => { //async 
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1m',
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '2m',
  });
};


const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }
 
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.id);

    // Set new access token in cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      // maxAge: 15 * 60 * 1000,
      maxAge: 60 * 1000, // 1 minute

    });

    return res.status(200).json(
      new ApiResponse(200, "Access token refreshed")
    );

  } catch (err) {
    throw new ApiError(403, "Invalid or expired refresh token");
  }
});




const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  
  // Set both tokens in secure cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    // maxAge: 15 * 60 * 1000,
    maxAge: 60 * 1000, // 1 minute
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    // maxAge: 7 * 24 * 60 * 60 * 1000,
    maxAge: 2 * 60 * 1000 // 2 minutes
  });

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      email: user.email,
      role: user.role,
    })
  );
});



const logoutUser = asyncHandler(async (req, res) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res.status(200).json(new ApiResponse(200, "Logged out successfully"));
});




const createUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email and password is required")
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    email,
    password,
    role,
  })

  return res.status(201).json(
    new ApiResponse(201, "User created successfully", user)
  );

})

export { createUser, LoginUser, logoutUser, refreshAccessToken }
