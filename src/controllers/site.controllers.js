import SiteDetail from "../models/SiteDetail.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const getSiteData = asyncHandler(async (req, res) => {
  const siteData = await SiteDetail.findOne();
  res.status(200).json(new ApiResponse(200, siteData));
});

export const updateSiteData = asyncHandler(async (req, res) => {
  const {
    ownerName,
    email,
    address,
    locationUrl,
    phone,
    youtubeChannelUrl,
    siteName,
    siteDomain,
  } = req.body;
  if (
    [
      ownerName,
      email,
      address,
      locationUrl,
      phone,
      youtubeChannelUrl,
      siteName,
      siteDomain,
    ].some((field) => field?.trim() === "")
  )
    throw new ApiError(400, "No data provided to update site details");

  const site = await SiteDetail.findOneAndUpdate(
    {},
    {
      ownerName,
      email,
      address,
      locationUrl,
      phone,
      youtubeChannelUrl,
      siteName,
      siteDomain,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, site, "Site details updated successfully"));
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) throw new ApiError(400, "No avatar provided to update");

  const avatar = await uploadToCloudinary(avatarLocalPath, "/SiteAssets");
  if (!avatar) throw new ApiError(500, "Failed to upload avatar");

  const site = await SiteDetail.findOne();

  if (site.avatarPublicId) await deleteFromCloudinary(site.avatarPublicId);

  const updatedSite = await SiteDetail.findOneAndUpdate(
    {},
    { avatarPublicId: avatar.public_id },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedSite, "Avatar updated successfully"));
});

export const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImagePath = req.file?.path;
  if (!coverImagePath)
    throw new ApiError(400, "No cover image provided to update");

  const coverImage = await uploadToCloudinary(coverImagePath, "/SiteAssets");
  if (!coverImage) throw new ApiError(500, "Failed to upload cover image");

  const site = await SiteDetail.findOne();

  await deleteFromCloudinary(site.coverImagePublicId);

  const updatedSite = await SiteDetail.findOneAndUpdate(
    {},
    { coverImagePublicId: coverImage.public_id },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedSite, "Cover image updated successfully")
    );
});
