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
  chamberId: {
    type: String,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
  bhHash: {
    type: String,
    default: "",
  },
  createdStamp: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  updatedStamp: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
});

const Chamber = mongoose.model("Chamber", ChamberSchema);

export default Chamber;
