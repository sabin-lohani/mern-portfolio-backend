import mongoose from "mongoose";

const siteDetailSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    avatarPublicId: { type: String, required: true },
    coverImagePublicId: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    locationUrl: { type: String, required: true },
    phone: { type: String, required: true },
    youtubeChannelUrl: { type: String, required: true },
    siteName: { type: String, required: true },
    siteDomain: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("SiteDetail", siteDetailSchema);
