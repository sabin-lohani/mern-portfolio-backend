import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  icon: { type: mongoose.Schema.Types.ObjectId, ref: "Icon" },
  url: { type: String, required: true },
});

export default mongoose.model("Social", socialSchema);
