import mongoose from "mongoose";
import crypto from "crypto";

const StatisticSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: () => `u:${crypto.randomBytes(6).toString("hex")}:d`,
  },
  scores: {
    type: Object,
    required: true,
    default: {
      Easy: 0,
      Medium: 0,
      Hard: 0,
      "Very Hard": 0,
    },
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

const Statistic = mongoose.model("Statistic", StatisticSchema);

export default Statistic;
