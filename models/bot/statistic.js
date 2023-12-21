import mongoose from "mongoose";

const StatisticSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: () =>
      `${crypto.randomBytes(6).toString("hex")}-${Math.floor(
        Date.now() / 1000
      )}`,
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
