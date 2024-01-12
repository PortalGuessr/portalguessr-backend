import mongoose from "mongoose";
import { generateDocumentId } from "../../utils/generateDocumentId";

const StatisticSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    default: () => generateDocumentId("US"),
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
