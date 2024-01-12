import mongoose from "mongoose";
import { generateDocumentId } from "../../utils/generateDocumentId.js";

const HistorySchema = new mongoose.Schema({
  historyId: {
    type: String,
    required: true,
    unique: true,
    default: () => generateDocumentId("HS"),
  },
  total: {
    type: Number,
    default: 0,
  },
  solved: {
    type: Number,
    default: 0,
  },
  timeout: {
    type: Number,
    default: 0,
  },
  skipped: {
    type: Number,
    default: 0,
  },
  mvp: {
    type: String,
    default: "",
  },
  participators: {
    type: Array,
    default: [],
  },
  chambers: {
    type: Array,
    default: [],
  },
  prompterUserId: {
    type: String,
    default: "",
  },
  difficulty: {
    type: String,
    default: "",
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
