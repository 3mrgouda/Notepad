import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please add a userId"],
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxLength: [40, "Title can not be more than 40 characters"],
  },
  description: {
    type: String,
    required: true,
    maxLength: [200, "Description can not be more than 200 characters"],
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", NoteSchema);
