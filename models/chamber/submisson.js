import mongoose from "mongoose";
import crypto from "crypto";

const SubmissionSchema = new mongoose.Schema({
  submissionUrl: {
    type: String,
    required: true,
    unique: true,
  },
  submissionId: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(16).toString("hex"),
  },
  submissionUserId: {
    type: Number,
    unique: true,
    default: crypto.randomBytes(8).readUint32LE(0),
  },
  submissionUserDiscordId: {
    type: Number,
    unique: true,
    default: crypto.randomBytes(8).readUint32LE(0),
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

const Submission = mongoose.model("Submission", SubmissionSchema);

export default Submission;
