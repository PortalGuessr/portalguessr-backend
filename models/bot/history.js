import mongoose from "mongoose";
import crypto from "crypto";

const HistorySchema = new mongoose.Schema({
  historyId: {
    type: String,
    required: true,
    unique: true,
    default: `${crypto.randomBytes(8).toString("hex")}-${new Date(Date.UTC())}`,
  },
  sessionHistory: {
    type: Object,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(Date.UTC()),
  },
  updatedDate: {
    type: Date,
    required: true,
    default: new Date(Date.UTC()),
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
