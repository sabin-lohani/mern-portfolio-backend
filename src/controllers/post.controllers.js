import Post from "../models/Post.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    throw new ApiError(400, "Post title and content are required");

  const newPost = await Post.create({ title, content });

  res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post added successfully"));
});

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

export const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title && !content)
    throw new ApiError(400, "No fields provided for update");

  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});
