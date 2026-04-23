import { asyncHandler } from "../utility/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blacklistToken.model.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res
      .status(400)
      .json(new ApiError(400, "Validation Error", formattedErrors));
  }

  const { fullname, email, password } = req.body;

  if (
    [fullname.firstname, email, password].some(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required and must not be empty");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return res
      .status(400)
      .json(new ApiError(400, "User with this email already exists"));
  }

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password,
  });

  const token = user.generateAuthToken();

  res
    .status(201)
    .json(
      new ApiResponse(201, "User registered successfully", { user, token }),
    );
});

const loginUser = asyncHandler(async (req, res, next) => {
  console.log("Login request received");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return res
      .status(400)
      .json(new ApiError(400, "Validation Error", formattedErrors));
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("User found:", user);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  console.log("Entered password:", password);
console.log("Stored hash:", user.password);

  if (!isMatch) {
     return res.status(401).json(new ApiError(401, "Invalid email or password"));
  }

  const token = user.generateAuthToken();
  const option = {
    httpOnly : true,
    secure : true
  }

  res
    .status(200)
    .cookie("token", token, option)
    .json(new ApiResponse(200, "Login successful", { user, token }));
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, "User profile retrieved successfully", req.user),
    );
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  await BlacklistToken.create({ token });
  const option = {
    httpOnly : true,
    secure : true
  }
  return res
    .status(200)
    .clearCookie("token", option)
    .json(new ApiResponse(200, "Logout successful"));
});

export { registerUser, loginUser, getUserProfile, logoutUser };
