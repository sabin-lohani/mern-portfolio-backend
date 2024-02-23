import mongoose from "mongoose";

const iconSchema = new mongoose.Schema({
  iconClass: { type: String, required: true },
  iconName: { type: String, required: true },
});

export default mongoose.model("Icon", iconSchema);
