import mongoose from "mongoose";
import crypto from "crypto";

const HistorySchema = new mongoose.Schema({
  historyId: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(8).toString("hex"),
  },
  total: {
    type: Number,
    required: true,
  },
  solved: {
    type: Number,
    required: true,
  },
  timeout: {
    type: Number,
    required: true,
  },
  skipped: {
    type: Number,
    required: true,
  },
  mvp: {
    type: String,
    required: true,
  },
  participators: {
    type: Array,
    required: true,
  },
  chambers: {
    type: Array,
    required: true,
  },
  prompterUserId: {
    type: String,
    required: true,
    unique: true,
  },
  createdStamp: {
    type: Number,
    required: true,
    default: () => Math.floor(Date.now() / 1000),
  },
  updatedStamp: {
    type: Number,
    required: true,
    default: () => Math.floor(Date.now() / 1000),
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
