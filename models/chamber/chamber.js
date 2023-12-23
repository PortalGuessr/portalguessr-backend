import mongoose from "mongoose";
import crypto from "crypto";

const ChamberSchema = new mongoose.Schema({
  chamberId: {
    type: String,
    default: () => `c:${crypto.randomBytes(6).toString("hex")}:d`,
  },
  submitter: {
    type: String,
    default: "706330866267193344",
  },
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
  bhHash: {
    type: String,
    default: () =>
      `placeholder-${crypto.randomBytes(6).toString("hex")}-${new Date()}`,
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
