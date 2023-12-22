import mongoose from "mongoose";
import crypto from "crypto";

const SubmissionSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
  },
  url: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    require: true,
  },
  submissionId: {
    type: String,
    default: () => `s:${crypto.randomBytes(6).toString("hex")}:d`,
  },
  submitter: {
    type: String,
    required: true,
  },
  bhHash: {
    type: String,
    default: () =>
      `placeholder-${crypto.randomBytes(6).toString("hex")}-${new Date()}`,
  },
  createdStamp: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  updatedStamp: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
});

const Submission = mongoose.model("Submission", SubmissionSchema);

export default Submission;
