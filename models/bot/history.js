import mongoose from "mongoose";
import crypto from "crypto";

const HistorySchema = new mongoose.Schema({
  historyId: {
    type: String,
    required: true,
    unique: true,
    default: () =>
      `${crypto.randomBytes(6).toString("hex")}-${Math.floor(
        Date.now() / 1000
      )}`,
  },
  totalGuessrs: {
    type: Number,
    default: 0,
  },
  finishedGuessrs: {
    type: Number,
    default: 0,
  },
  chambersHistory: {
    type: Array,
    default: [{ id: "", isSolved: false, isSkipped: false }], // Example array.
  },
  sessionHistory: {
    type: Object,
    default: {
      guessrSolved: 0,
      guessrTimeout: 0,
      guessrSkipped: 0,
      sessionUsersParticipated: [],
      sessionUsersCorrect: [],
      sessionStopped: False,
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

const History = mongoose.model("History", HistorySchema);

export default History;
