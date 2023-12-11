import mongoose from "mongoose";
import crypto from "crypto";

const HistorySchema = new mongoose.Schema({
  historyId: {
    type: String,
    required: true,
    unique: true,
    default: `${crypto.randomBytes(8).toString("hex")}-${new Date()}`,
  },
  sessionHistory: {
    type: Object,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const History = mongoose.model("History", HistorySchema);

export default History;
