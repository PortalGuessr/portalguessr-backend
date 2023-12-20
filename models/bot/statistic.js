import mongoose from "mongoose";

const StatisticSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: "",
  },
  scores: {
    type: Object,
    default: {
      Easy: 0,
      Medium: 0,
      Hard: 0,
      "Very Hard": 0,
    },
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

const Statistic = mongoose.model("Statistic", StatisticSchema);

export default Statistic;
