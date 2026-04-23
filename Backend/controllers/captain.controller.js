import CaptainModel from "../models/captain.model.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utility/ApiError.js";
import {createCaptain} from "../services/captain.service.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

const registerCaptain = asyncHandler(async (req, res, next) => {
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

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await CaptainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    throw new ApiError(400, "Captain with this email already exists");
  }

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  if(!captain){
    throw new ApiError(500, "Failed to create captain");
  }

  const token = captain.generateAuthToken();

  if (!token) {
    throw new ApiError(500, "Failed to generate authentication token");
  }

  res.status(201).json(new ApiResponse(201, "Captain registered successfully", { captain, token }));
});

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await CaptainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

const getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistToken.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Logout successfully" });
};


export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };