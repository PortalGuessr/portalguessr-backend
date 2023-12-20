import mongoose from "mongoose";
import crypto from "crypto";

const ChamberSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
  bhHash: {
    type: String,
    unique: true,
    default: `placeholder-${crypto.randomBytes(8).toString("hex")}-${new Date(
      Date.UTC()
    )}`,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.UTC()),
  },
  updatedDate: {
    type: Date,
    default: new Date(Date.UTC()),
  },
});

const Chamber = mongoose.model("Chamber", ChamberSchema);

export default Chamber;
