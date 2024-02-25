import User from "../models/User.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!accessToken) throw new ApiError(401, "Unauthorized request");

  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) throw new ApiError(401, "Invalid access token");

  req.user = user;
  next();
});

export const authorizeAdmin = asyncHandler(async (req, _, next) => {
  if (!req.user.isAdmin) throw new ApiError(403, "Unauthorized request");
  next();
});
