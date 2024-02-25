import asyncHandler from "../utils/asyncHandler.js";
import Icon from "../models/Icon.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getIcons = asyncHandler(async (req, res) => {
  const icons = await Icon.find();
  res
    .status(200)
    .json(new ApiResponse(200, icons, "Icons fetched successfully"));
});

export const addIcon = asyncHandler(async (req, res) => {
  const { iconName, iconClass } = req.body;
  if (!iconName || !iconClass)
    throw new ApiError(400, "Icon name and class are required");

  const alreadyExist = await Icon.findOne({ iconClass });
  if (alreadyExist) throw new ApiError(400, "Icon class already exists");

  const newIcon = await Icon.create({ iconName, iconClass });

  res
    .status(201)
    .json(new ApiResponse(201, newIcon, "Icon added successfully"));
});

export const updateIcon = asyncHandler(async (req, res) => {
  const { iconName, iconClass } = req.body;
  if (!iconName && !iconClass)
    throw new ApiError(400, "No fields provided for update");

  const icon = await Icon.findById(req.params.id);
  if (!icon) throw new ApiError(404, "Icon not found");

  const alreadyExist = await Icon.findOne({ iconClass });
  if (alreadyExist && alreadyExist._id.toString() !== req.params.id)
    throw new ApiError(400, "Icon class already exists");

  const updatedIcon = await Icon.findByIdAndUpdate(
    req.params.id,
    { iconName, iconClass },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedIcon, "Icon updated successfully"));
});

export const deleteIcon = asyncHandler(async (req, res) => {
  const icon = await Icon.findById(req.params.id);
  if (!icon) throw new ApiError(404, "Icon not found");

  await Icon.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, null, "Icon deleted successfully"));
});
