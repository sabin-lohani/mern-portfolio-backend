import Social from "../models/social.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getSocials = asyncHandler(async (req, res) => {
  const socials = await Social.find().populate("icon");
  res
    .status(200)
    .json(new ApiResponse(200, socials, "Socials fetched successfully"));
});

export const addSocial = asyncHandler(async (req, res) => {
  const { icon, url } = req.body;
  if (!icon || !url) throw new ApiError(400, "Icon and URL are required");

  const newSocial = await Social.create({ icon, url });

  res
    .status(201)
    .json(new ApiResponse(201, newSocial, "Social added successfully"));
});

export const updateSocial = asyncHandler(async (req, res) => {
  const { icon, url } = req.body;
  if (!icon && !url) throw new ApiError(400, "No fields provided for update");

  const social = await Social.findById(req.params.id);
  if (!social) throw new ApiError(404, "Social not found");

  const updatedSocial = await Social.findByIdAndUpdate(
    req.params.id,
    { icon, url },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedSocial, "Social updated successfully"));
});

export const deleteSocial = asyncHandler(async (req, res) => {
  const social = await Social.findById(req.params.id);
  if (!social) throw new ApiError(404, "Social not found");

  await Social.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Social deleted successfully"));
});
