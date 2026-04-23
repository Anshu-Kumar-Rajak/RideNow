import {asyncHandler} from "../utility/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import CaptainModel from "../models/captain.model.js";
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
        throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decoded){
        throw new ApiError(401, "Unauthorized");
    }
    const user = await User.findById(decoded._id);
    if(!user){
        throw new ApiError(401, "Unauthorized");
    }
    req.user = user;
    next();
});

const authCaptain = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const captain = await CaptainModel.findById(decoded._id)
        req.captain = captain;
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
});

export { authUser, authCaptain };
