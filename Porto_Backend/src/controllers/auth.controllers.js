import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiErrors.js'
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1d', // or any time you prefer
  });
};


const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Compare passwords
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT
  const token = generateToken(user._id);

  // Set token in httpOnly cookie
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // send only over https in prod
    sameSite: "Strict", // protect from CSRF
    // sameSite: "Lax"
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Respond with success
  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      email: user.email,
      role: user.role,
    })
  );
});


// const logoutUser = asyncHandler(async (req, res) => {
//   res.clearCookie("accessToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Strict"
//   });

//   return res.status(200).json(new ApiResponse(200, "Logged out successfully"));
// });





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

export { createUser, LoginUser }
