import mongoose from "mongoose";
import crypto from "crypto";

const ScoreSchema = new mongoose.Schema({
  discordUserId: {
    type: Number,
    unique: true,
    required: true,
    default: crypto.randomBytes(8).readUint32LE(0),
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
    default: new Date(),
  },
  updatedDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Score = mongoose.model("Leaderboard", ScoreSchema);

export default Score;
